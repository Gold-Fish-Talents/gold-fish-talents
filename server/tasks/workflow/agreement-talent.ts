import MarkdownIt from 'markdown-it'
import puppeteer from 'puppeteer'
import { NotionToMarkdown } from 'notion-to-md'
import { inspect } from 'node:util'
import type { NotionModel } from '~~/shared/types'

let n2m: NotionToMarkdown
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

export function formatDate(dt: Date | string) {
  if (typeof dt === 'string') dt = new Date(dt)
  return dt.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export async function imageUrlToBase64(url: string): Promise<string> {
  const res = await $fetch.raw(url, { responseType: 'arrayBuffer' })
  const type = res.headers.get('content-type') || 'application/octet-stream'
  const ab = res._data as ArrayBuffer

  // Server (Node) path: use Buffer
  if (typeof Buffer !== 'undefined' && typeof Buffer.from === 'function') {
    const base64 = Buffer.from(ab).toString('base64')
    return `data:${type};base64,${base64}`
  }

  // Browser path: use FileReader for robust conversion
  const blob = new Blob([ab], { type })
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
  return dataUrl
}

async function headerTemplate() {
  return `<section style="width:100%; font-size:16px; padding:0 0 0 0; display:block; text-align:center; font-family:system-ui;">
 <div style="margin:0 0 6mm 0;">
  <img 
    src="${await imageUrlToBase64('https://goldfishtalents.com/logo.svg')}"
    alt="Gold Fish Talents Logo"
    style="height:64px; margin-right:14px; display:inline-block; vertical-align:middle;" />
  <span style="font-size:36px; font-weight:500; letter-spacing:0.5px; display:inline-block; vertical-align:middle;">
    Gold Fish Talents LLP
  </span>
</div>
  <div style="margin-bottom:8px;padding:0 12mm;">
    <span style="font-weight:600;">Registered Address:</span> 
    C/O Samita Nandy, 17 No N S Road, Harinavi Beltola, P.O.- Harinavi, P.S.- Sonarpur, Pincode: 700148, Ward No. 23,
    District: South 24 Parganas, India
  </div>
  <div style="margin-bottom:6px;">
    Email: <a href="mailto:contact@goldfishtalents.com" style="color:#1565C0; text-decoration:underline;">contact@goldfishtalents.com</a>
    &nbsp;&nbsp;
    Phone: +919433128726
  </div>
  <div>
    Website: <a href="https://goldfishtalents.com" style="color:#1565C0; text-decoration:underline;">https://goldfishtalents.com</a>
  </div>
</section>`
}

async function footerTemplate() {
  return `
  <section style="position:relative; width:100%; font-size:14px; padding:0 20mm 4mm 20mm; display:flex; justify-content:space-between; align-items:center;">
    <img
      src="${await imageUrlToBase64('https://goldfishtalents.com/logo.svg')}"
      alt="Gold Fish Talents Logo"
      style="
        position:absolute;
        right:0;
        top:0;
        transform: translateX(15%) translateY(-60%);
        opacity:0.1;
        width:300px;
        pointer-events:none;
        user-select:none;
      "
    />
    <span>
      <span style="font-size:14px; font-weight:bold">Signature: ______________________</span>
    </span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    <style>
      @media (min-width: 768px) {
        section > img[alt="Gold Fish Talents Logo"] {
          left: -104px;
          transform: translateY(-37%);
          width: 560px;
        }
      }
    </style>
  </section>`
}

async function wrapHtml(html: string, title: string) {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <style>
      @page { margin: 12mm 18mm 28mm 18mm; size: A4; }
      body { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 14px; color: #222; }
      table { border-collapse: collapse; width: 100%; margin: 2em 0; }
      th, td { border: 1px solid #bbb; padding: 7px 10px; }
      th { background: #f3f3f3; }
      h1, h2 {
        text-align: center;
        margin: auto;
        margin-top: 1.2em;
      }
      h3, h4, h5, h6, li {
        text-align: left;
        margin-top: 0.6em;
      }
      .page-break { 
        page-break-before: always; break-before: page; 
      }
      table:last-of-type {
        border-collapse: separate;
        border-spacing: 0 22px;
        width: 100%;
      }
      table:last-of-type th,
      table:last-of-type td {
        width: 50%;
        border: none !important;
        padding: 9px 10px;
        font-size: 15px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    ${await headerTemplate()}
    ${html}
  </body>
  </html>`
}

async function createDocument({
  termsTalentMarkdown,
  talentDetails,
}: {
  termsTalentMarkdown: string
  talentDetails: {
    name: string
    address: string
    phone: string
    email: string
    dob: string
    profession: string
    pan?: string
    gstin?: string
    bankAccountName?: string
    bankAccountNumber?: number
    bankIfsc?: string
    bankName?: string
    bankBranch?: string
    upi?: string
  }
}) {
  const mdContent = `
## TALENT ONBOARDING AGREEMENT & COMMUNITY GUIDELINES

**Between:**

**Gold Fish Talents LLP** (LLPIN: ACS-4084)

Registered Office: C/O Samita Nandy, 17 No N S Road, Harinavi Beltola, P.O.- Harinavi, P.S.-
Sonarpur, Pincode: 700148, Ward No. 23, District: South 24 Parganas, India
Email: [contact@goldfishtalents.com](mailto:contact@goldfishtalents.com) Phone: +919433128726

("GFT", "we", "us")

**AND**

**Talent Name:** ${talentDetails.name}  
**Talent Address:** ${talentDetails.address}  
**Talent Phone No:** ${talentDetails.phone.toString()}  
**Talent Email:** [${talentDetails.email}](mailto:${talentDetails.email})   
**PAN:** ${talentDetails.pan}  
**GSTIN (optinal):** ${talentDetails.gstin}  
**Talent Date of Birth:** ${talentDetails.dob}    
**Talent Profession:** ${talentDetails.profession} 

**Bank Account Name (optional):** ${talentDetails.bankAccountName}  
**Bank Account Number (optional):** ${talentDetails.bankAccountNumber}  
**Bank IFSC (optional):** ${talentDetails.bankIfsc}  
**Bank Name (optional):** ${talentDetails.bankName}  
**Branch Name (optional):** ${talentDetails.bankBranch}  
**UPI ID (optional):** ${talentDetails.upi}  

("Talent", "you")

**Effective Date:**

Term: 12 months (auto-renews yearly unless 30 days' written notice given)

***

${termsTalentMarkdown}

***

## ACCEPTANCE & SIGNATURE

<br>

By signing below, you acknowledge that the Gold Fish Talents Full Talent Terms &
Conditions available at https://goldfishtalents.com/terms/talent (as existing on the date of your
signature) are incorporated into and form part of this Agreement, and you confirm you have had
a reasonable opportunity to read them.
By signing below, I acknowledge and agree that:

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

***

| For Gold Fish Talents   | For Talent              |
| ------------------------| ----------------------- |
| Authorized Signature:   | Signatory:              |
| Name:                   | Name:                   |
| Date:                   | Date:                   |
| Place:                  | Place:                  |


_N.B: This Agreement consists of [8] pages including this one. Please sign all pages._
`
  // Markdown → HTML
  const html = md.render(mdContent)
  const pageHtml = await wrapHtml(html.replace(/\n<hr>\n/g, '<div class="page-break"></div>'), `agreement-${slugify(talentDetails.name)}.pdf`)

  let pdfBuffer: Uint8Array<ArrayBufferLike>
  let browser

  try {
    if (import.meta.env.NODE_ENV === 'production') {
      browser = await puppeteer.connect({
        browserWSEndpoint: import.meta.env.BROWSER_ENDPOINT,
      })
    } else {
      browser = await puppeteer.launch({
        headless: true,
      })
    }

    const page = await browser.newPage()
    await page.setContent(pageHtml, { waitUntil: 'networkidle0' })

    pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: await footerTemplate(),
      margin: { top: '28mm', right: '15mm', bottom: '28mm', left: '15mm' },
    })
  } catch (error) {
    console.error('Failed to generate PDF:', error)
  } finally {
    if (browser) {
      if (import.meta.env.NODE_ENV === 'production') {
        await browser.disconnect()
      } else {
        await browser.close()
      }
    }
  }

  return { fileName: `agreement-${slugify(talentDetails.name)}.pdf`, fileBuffer: pdfBuffer }
}

type Recipient = {
  name: string
  email: string
  role: 'CC' | 'SIGNER' | 'VIEWER' | 'APPROVER' | 'ASSISTANT' // use SIGNER for signing
  signingOrder: number
}

type Field = {
  type: 'SIGNATURE' | 'NAME' | 'TEXT' | 'DATE' | 'CHECKBOX'
  page: number
  x: number
  y: number
  width: number
  height: number
  recipient: string // recipient email
  label?: string
  required?: boolean
  fieldMeta?: unknown
}

/* async function getAllDocuments() {
  const config = useRuntimeConfig()
  const { documensoApi, documensoApiKey } = config.private

  const res = await $fetch<{
    documents: {
      id: number;
      externalId: string;
      userId: number;
      teamId: number;
      title: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      completedAt: string;
    }[];
    totalPages: number;
  }
  >('/documents', {
    baseURL: documensoApi,
    headers: {
      Authorization: `Bearer ${documensoApiKey}`
    }
  });

  if (!res.documents) throw new Error('No documents found');
  return res.documents;
}

async function getDocument(documentId: number | string) {
  const config = useRuntimeConfig()
  const { documensoApi, documensoApiKey } = config.private

  return $fetch(`/documents/${documentId}`, {
    baseURL: documensoApi,
    headers: {
      Authorization: `Bearer ${documensoApiKey}`
    }
  });
} */

interface DocumentField {
  recipientId: number
  type: string
  pageNumber: number
  pageX: number
  pageY: number
  pageWidth: number
  pageHeight: number
}

export async function sendDocument({
  title,
  pdfBuffer,
  recipients,
  fields,
  meta = {},
}: {
  title: string
  pdfBuffer: Buffer | ArrayBuffer | Uint8Array
  recipients: Recipient[]
  fields: Field[]
  meta?: Record<string, unknown>
}) {
  const config = useRuntimeConfig()
  const { documensoApi, documensoApiKey } = config.private

  // 1. Create the document
  const {
    uploadUrl,
    documentId,
    recipients: recipientsDetails,
  } = await $fetch<{
    uploadUrl: string
    documentId: number
    recipients: {
      recipientId: number
      name: string
      email: string
      token: string
      role: string
      signingOrder: null
      signingUrl: string
    }[]
  }>('/documents', {
    baseURL: documensoApi,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${documensoApiKey}`,
    },
    body: {
      title,
      recipients,
      ...meta,
    },
  })

  // 2. Upload the pdf
  await $fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/pdf',
    },
    body: pdfBuffer,
  })

  // 3. Define signing fields using the fields API
  await $fetch(`/documents/${documentId}/fields`, {
    baseURL: documensoApi,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${documensoApiKey}`,
    },
    body: fields.map<DocumentField>(({ recipient, type, page, x, y, width, height, label, fieldMeta, ...opts }) => ({
      recipientId: recipientsDetails.find((r) => r.email === recipient)!.recipientId,
      type,
      pageNumber: page,
      pageX: x,
      pageY: y,
      pageWidth: width,
      pageHeight: height,
      required: true,
      label: label,
      ...opts,
      fieldMeta,
    })),
  })

  // 4. Send invitation if not automatic in your instance
  await $fetch(`${documensoApi}/documents/${documentId}/send`, {
    baseURL: documensoApi,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${documensoApiKey}`,
    },
    body: {
      sendEmail: true,
      sendCompletionEmails: true,
    },
  })

  return { documentId }
}
/*  */

export default defineTask({
  meta: {
    name: 'workflow:agreement-talent',
    description: 'Create Talent Agreement from CMS',
  },
  async run() {
    const config = useRuntimeConfig()
    const notionDbId = config.private.notionDbId as unknown as NotionDB

    /* const today = new Date()
    const expiry = new Date(today)
    expiry.setDate(expiry.getDate() + 15) */

    n2m = n2m ?? new NotionToMarkdown({ notionClient: notion })

    const talents = await notionQueryDb<NotionModel>(notion, notionDbId.model, {
      filter: {
        property: 'Status',
        status: {
          equals: 'Filled',
        },
      },
    })

    await Promise.allSettled(
      talents.map(async ({ id, properties }) => {
        try {
          const talentId = id
          const status = properties.Status.status.name

          if (!(status === 'Filled')) return

          console.log('✅ Talent Agreement Started:', notionTextStringify(properties.Name.title))

          const goldfishtalentsDetails = {
            name: 'Aratrik Nandy',
            email: 'admin@goldfishtalents.com',
          }
          const talentDetails = {
            name: notionTextStringify(properties.Name.title),
            address: notionTextStringify(properties.Address.rich_text),
            phone: properties.Phone?.phone_number,
            email: import.meta.env.NODE_ENV === 'production' ? properties.Email.email : 'goldfishbowl24@gmail.com',
            dob: formatDate(properties.DOB.date.start),
            profession: notionTextStringify(properties.Profession.rich_text),
            pan: notionTextStringify(properties.PAN.rich_text),
            gstin: notionTextStringify(properties.GSTIN.rich_text),
            bankAccountName: notionTextStringify(properties['Bank Account Name'].rich_text),
            bankAccountNumber: (properties['Bank Account Number'].number as number) ?? '',
            bankIfsc: notionTextStringify(properties['Bank IFSC code'].rich_text),
            bankName: notionTextStringify(properties['Bank Name'].rich_text),
            bankBranch: notionTextStringify(properties['Bank Branch'].rich_text),
            upi: notionTextStringify(properties['UPI ID'].rich_text),
          }

          const termsTalentUpdateDate = ((await notion.pages.retrieve({ page_id: notionDbId.termsTalent })) as unknown as NotionAsset).last_edited_time
          const termsTalentMarkdown = `**Last Updated**: ${formatDate(termsTalentUpdateDate)}\n` + (await notionPageToMarkdown(n2m, notionDbId.termsTalent, false))

          console.log('📥 Talent Agreement Details Fetched', { talentDetails })

          const pdf = await createDocument({
            termsTalentMarkdown,
            talentDetails,
          })

          console.log('📄 Talent Agreement Created:', pdf.fileName)

          // const documentStorage = useStorage('fs')
          // await documentStorage.setItemRaw(`documents/${pdf.fileName}`, pdf.fileBuffer)

          // const doc = (await getAllDocuments())[0];
          // const meta = await getDocument(doc.id);

          await sendDocument({
            title: pdf.fileName,
            recipients: [
              { name: talentDetails.name, email: talentDetails.email, role: 'SIGNER', signingOrder: 1 },
              { name: goldfishtalentsDetails.name, email: goldfishtalentsDetails.email, role: 'SIGNER', signingOrder: 2 },
            ],
            pdfBuffer: pdf.fileBuffer,
            fields: [
              { type: 'DATE', page: 1, x: 22.4, y: 77, width: 19.6, height: 3, recipient: goldfishtalentsDetails.email },
              { type: 'SIGNATURE', page: 1, x: 20.7, y: 91.3, width: 19.6, height: 5.3, recipient: talentDetails.email },
              { type: 'SIGNATURE', page: 2, x: 20.7, y: 91.3, width: 19.6, height: 5.3, recipient: talentDetails.email },
              { type: 'SIGNATURE', page: 3, x: 20.7, y: 91.3, width: 19.6, height: 5.3, recipient: talentDetails.email },
              { type: 'SIGNATURE', page: 4, x: 20.7, y: 91.3, width: 19.6, height: 5.3, recipient: talentDetails.email },
              { type: 'SIGNATURE', page: 5, x: 20.7, y: 91.3, width: 19.6, height: 5.3, recipient: talentDetails.email },
              { type: 'SIGNATURE', page: 6, x: 20.7, y: 91.3, width: 19.6, height: 5.3, recipient: talentDetails.email },
              {
                type: 'CHECKBOX',
                page: 7,
                x: 5.5,
                y: 20,
                width: 180,
                height: 20,
                recipient: talentDetails.email,
                fieldMeta: {
                  required: true,
                  type: 'checkbox',
                  values: [
                    { id: 1, checked: false, value: 'I have read and understood this Agreement and the Full Terms & Privacy Policy at the URLs above.' },
                    { id: 2, checked: false, value: 'I agree to the 12-month non-circumvention period and ₹5,000+ penalty for breach.' },
                    { id: 3, checked: false, value: 'I agree to keep client and GFT information confidential for 2 years.' },
                    { id: 4, checked: false, value: 'I consent to GFT processing my personal data per the Privacy Policy.' },
                    { id: 5, checked: false, value: 'I am an independent contractor, not an employee; responsible for own taxes.' },
                    { id: 6, checked: false, value: 'I indemnify GFT from claims arising from my performance failures or misconduct.' },
                    { id: 7, checked: false, value: 'All information I provided is accurate and complete.' },
                  ],
                },
              },
              { type: 'SIGNATURE', page: 8, x: 61, y: 54.77 - 41.05, width: 19.6, height: 4, recipient: talentDetails.email },
              { type: 'NAME', page: 8, x: 61, y: 60.15 - 41.05, width: 19.6, height: 4, recipient: talentDetails.email },
              { type: 'DATE', page: 8, x: 61, y: 65.53 - 41.05, width: 19.6, height: 4, recipient: talentDetails.email },
              {
                type: 'TEXT',
                page: 8,
                x: 61,
                y: 70.91 - 41.05,
                width: 19.6,
                height: 4,
                recipient: talentDetails.email,
                fieldMeta: {
                  label: 'Place',
                  required: true,
                  readOnly: false,
                  type: 'text',
                  fontSize: 12,
                  textAlign: 'left',
                },
              },
              { type: 'SIGNATURE', page: 8, x: 30, y: 54.77 - 41.05, width: 19.6, height: 4, recipient: goldfishtalentsDetails.email },
              { type: 'NAME', page: 8, x: 30, y: 60.15 - 41.05, width: 19.6, height: 4, recipient: goldfishtalentsDetails.email },
              { type: 'DATE', page: 8, x: 30, y: 65.53 - 41.05, width: 19.6, height: 4, recipient: goldfishtalentsDetails.email },
              {
                type: 'TEXT',
                page: 8,
                x: 30,
                y: 70.91 - 41.05,
                width: 19.6,
                height: 4,
                recipient: goldfishtalentsDetails.email,
                fieldMeta: {
                  label: 'Place',
                  required: true,
                  readOnly: false,
                  type: 'text',
                  fontSize: 12,
                  textAlign: 'left',
                },
              },
            ],
            meta: {
              subject: 'Talent Onboarding Agreement',
              message: `Hi ,
              Welcome to Gold Fish Talents! Attached is your Talent Agreement. 
              Please read the following carefully before signing.

                - The attached Agreement
                - Full Terms & Conditions: https://goldfishtalents.com/talent/terms
                - Privacy Policy: https://goldfishtalents.com/privacy/policy

              Key terms to note:

                - You receive 100% of your agreed rate (we don't deduct commission)
                - 12-month non-circumvention with ₹5K-25% penalty for breach
                - 2-year confidentiality obligation
                - Independent contractor status (you're responsible for your own taxes)

              If you have questions, reply to this email. 

              Once you've reviewed everything, please sign and return.

              Regards,
              Gold Fish Talents LLP`,
              timezone: 'Asia/Kolkata',
              dateFormat: 'MMMM dd, yyyy hh:mm a',
              signingOrder: 'SEQUENTIAL',
              redirectUrl: '',
              language: 'en',
              typedSignatureEnabled: false,
              drawSignatureEnabled: false,
              distributionMethod: 'EMAIL',
            },
          })

          await notion.pages.update({
            page_id: talentId,
            properties: {
              Status: {
                status: {
                  name: 'Verified',
                },
              },
            },
          })

          console.log('📤 Talent Agreement Sent')

          properties.Status.status.name = 'Verified'
          // await talentStorage.setItem(notionNormalizeId(projectId), talent)
        } catch (error) {
          console.error('error:', error)
          console.error('data:', inspect(error?.data, { depth: null, colors: true, maxArrayLength: null }))

          throw error // rethrow so caller can handle
        }
      })
    )

    return { result: 'success' }
  },
})
