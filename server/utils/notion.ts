import { Client } from '@notionhq/client'

const notionClientSingleton = () => {
  return new Client({ auth: import.meta.env.NOTION_API_KEY })
}

declare global {
  var notionGlobal: ReturnType<typeof notionClientSingleton> | undefined
}

const notion = globalThis.notionGlobal ?? notionClientSingleton()

export default notion

if (import.meta.env.NODE_ENV !== 'production') globalThis.notionGlobal = notion
