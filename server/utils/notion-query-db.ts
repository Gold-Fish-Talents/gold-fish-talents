import type { Client } from '@notionhq/client'
import type { QueryDataSourceParameters } from '@notionhq/client/build/src/api-endpoints'

export default async function <T>(notion: Client, dbId: string, queryOptions?: Omit<QueryDataSourceParameters, 'database_id'>): Promise<T[]> {
  const content: T[] = []
  let cursor: string | undefined = undefined

  do {
    const response = await notion.dataSources.query({
      data_source_id: dbId,
      page_size: 100,
      start_cursor: cursor,
      ...queryOptions,
    })

    content.push(...(response.results as unknown as T[]))
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return content
}
