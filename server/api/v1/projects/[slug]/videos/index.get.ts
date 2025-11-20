import { z } from 'zod'

export default defineCachedEventHandler<Promise<Video[]>>(
  async (event) => {
    try {
      const { slug: projectSlug } = await getValidatedRouterParams(
        event,
        z.object({
          slug: z.string().min(1),
        }).parse
      )

      const config = useRuntimeConfig()
      const notionDbId = config.private.notionDbId as unknown as NotionDB

      const projects = await notionQueryDb<NotionProject>(notion, notionDbId.project)
      const projectId = projects.find(({ properties }) => slugify(notionTextStringify(properties.Name.title)) === projectSlug)?.id
      const assets = await notionQueryDb<NotionAsset>(notion, notionDbId.asset, {
        filter: {
          and: [
            {
              property: 'Project',
              relation: projectId
                ? {
                    contains: projectId,
                  }
                : {
                    is_empty: true,
                  },
            },
          ],
        },
      })

      const videos = assets.filter(({ properties }) => properties.Type?.select?.name === 'Video' && properties.Status.status?.name === 'Release')

      if (!videos) throw createError({ statusCode: 500, statusMessage: 'videos is undefined' })

      const results = await Promise.allSettled(
        videos
          .toSorted((a, b) => {
            const pa = b.properties['Project Index'].rollup?.array[0]?.number ?? 0
            const pb = a.properties['Project Index'].rollup?.array[0]?.number ?? 0
            return pa - pb || (b.properties.Index?.number ?? 0) - (a.properties.Index?.number ?? 0)
          })
          .map<Promise<Video>>(async ({ cover, properties }) => {
            const slug: string = properties.Slug.formula.string

            // if (slugify(notionTextStringify(properties.Slug.rich_text)) !== slug)
            //   slugMap[slugify(notionTextStringify(properties.Slug.rich_text))] = slug

            const [aW, aH] = properties['Aspect ratio'].select.name.split(':').map((item) => parseInt(item))
            const aspectRatio = aW / aH

            return {
              id: slug,
              title: notionTextStringify(properties.Name.title),
              description: notionTextStringify(properties.Description.rich_text),
              poster: cover?.type === 'external' ? cover.external.url : undefined,
              sources: videoGenerateSources(slug, slug.includes('featured-video') ? heroPreset : aspectRatio < 1 ? portraitPreset : landscapePreset),
              type: slug.includes('featured-video') ? 'hero' : 'feature',
              featured: properties.Featured.checkbox,
              projectId: properties.Project.relation[0].id,
              url: `/video/${slug}`,
            }
          })
      )

      return results.filter((result) => result.status === 'fulfilled').map((result) => result.value)
    } catch (error: unknown) {
      console.error('API video GET', error)

      if (error instanceof Error && 'statusCode' in error) {
        throw error
      }

      throw createError({
        statusCode: 500,
        statusMessage: 'Some Unknown Error Found',
      })
    }
  },
  { maxAge: 60 * 1, swr: true }
)
