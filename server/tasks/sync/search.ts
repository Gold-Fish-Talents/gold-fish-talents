import { syncSearchDb } from '~~/server/api/search/sync.post'

async function syncCoverPhoto() {
  const config = useRuntimeConfig()
  const notionDbId = config.private.notionDbId as unknown as NotionDB

  const models = await notionQueryDb<NotionModel>(notion, notionDbId.model)
  const assets = await notionQueryDb<NotionAsset>(notion, notionDbId.asset)

  for (const model of models) {
    const coverPhoto =
      assets
        .filter(
          ({ properties }) => properties.Type?.select?.name === 'Photo' && properties.Status?.status?.name === 'Release' && model?.id && properties.Model?.relation?.some((r) => r.id === model.id)
        )
        .slice() // avoid mutating the filtered array when sorting
        .sort((a, b) => (a.properties.Index?.number ?? Infinity) - (b.properties.Index?.number ?? Infinity))[0] ?? null

    if (!coverPhoto) continue

    console.log('🍃 Updating', { model: notionTextStringify(model.properties.Name.title) })

    await notion.pages.update({
      page_id: model.id,
      cover: { type: 'external', external: { url: coverPhoto.cover?.type === 'external' ? coverPhoto.cover.external.url : '' } },
    })
  }
}

export default defineTask({
  meta: {
    name: 'sync:search',
    description: 'Sync notion resources into search db',
  },
  async run() {
    console.log('Running Task search:sync...')

    await syncCoverPhoto()

    await syncSearchDb()

    return { result: 'success' }
  },
})
