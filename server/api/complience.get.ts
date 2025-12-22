import { NotionToMarkdown } from 'notion-to-md'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const termsClientPageId = (config.private.notionDbId as unknown as NotionDB).termsClient
  const termsTalentPageId = (config.private.notionDbId as unknown as NotionDB).termsTalent
  const privacyPageId = (config.private.notionDbId as unknown as NotionDB).privacy
  const cancellationPageId = (config.private.notionDbId as unknown as NotionDB).cancellation
  const licensePageId = (config.private.notionDbId as unknown as NotionDB).license

  const n2m = new NotionToMarkdown({ notionClient: notion })

  const termsClientContent = (await notion.pages.retrieve({ page_id: termsClientPageId })) as unknown as NotionContent
  const termsClientLastUpdated = termsClientContent.last_edited_time
  const termsClientMarkdown = await notionPageToMarkdown(n2m, termsClientPageId, true)

  const termsTalentContent = (await notion.pages.retrieve({ page_id: termsTalentPageId })) as unknown as NotionContent
  const termsTalentLastUpdated = termsTalentContent.last_edited_time
  const termsTalentMarkdown = await notionPageToMarkdown(n2m, termsTalentPageId, true)

  const privacyContent = (await notion.pages.retrieve({ page_id: privacyPageId })) as unknown as NotionContent
  const privacyLastUpdated = privacyContent.last_edited_time
  const privacyMarkdown = await notionPageToMarkdown(n2m, privacyPageId, true)

  const cancellationContent = (await notion.pages.retrieve({ page_id: cancellationPageId })) as unknown as NotionContent
  const cancellationLastUpdated = cancellationContent.last_edited_time
  const cancellationMarkdown = await notionPageToMarkdown(n2m, cancellationPageId, true)

  const licenseContent = (await notion.pages.retrieve({ page_id: licensePageId })) as unknown as NotionContent
  const licenseLastUpdated = licenseContent.last_edited_time
  const licenseMarkdown = await notionPageToMarkdown(n2m, licensePageId, true)

  return {
    terms: {
      client: {
        content: termsClientMarkdown,
        lastUpdated: termsClientLastUpdated,
      },
      talent: {
        content: termsTalentMarkdown,
        lastUpdated: termsTalentLastUpdated,
      },
    },
    privacy: {
      content: privacyMarkdown,
      lastUpdated: privacyLastUpdated,
    },
    cancellation: {
      content: cancellationMarkdown,
      lastUpdated: cancellationLastUpdated,
    },
    license: {
      content: licenseMarkdown,
      lastUpdated: licenseLastUpdated,
    },
  }
})
