import type { Component } from 'vue'
import emailTemplate from '~~/server/emails'
import { findOrCreateNotionUser } from '~~/server/routes/auth/google.get'
import type { EmailMetaData, EmailTemplateData } from '~~/server/emails'

// function createOtpHtmlFallback(otp: string, toEmail: string, fromCompanyName: string) {
//   return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Verify Email</title></head><body style="font-family:sans-serif;padding:20px;max-width:400px;margin:0 auto"><h2 style="color:#1B2433">${fromCompanyName} Verification Code</h2><p style="color:#273349">Hello ${toEmail},</p><p style="color:#273349">Use the following code to complete your sign in:</p><p style="background:#E9EBED;padding:16px;font-size:24px;font-weight:bold;letter-spacing:4px;text-align:center;border-radius:8px">${otp}</p><p style="color:#9399A4;font-size:14px">This code will expire in 10 minutes.</p></body></html>`
// }

export async function sendEmail<T extends keyof EmailTemplateData>(template: T, payload: EmailTemplateData[T][]) {
  const isDev = process.env.NODE_ENV !== 'production'

  if (isDev && template === 'otp') {
    for (const payloadData of payload) {
      const otpData = payloadData as { otp: string; toEmail: string }
      console.log('[Dev] OTP for', otpData.toEmail, ':', otpData.otp)
    }
    return true
  }

  let isSuccessful = true
  const config = useRuntimeConfig()
  const metaData = config.private.emailMetaData as unknown as EmailMetaData

  await Promise.allSettled(
    payload.map(async (payloadData) => {
      try {
        const allData = { ...metaData, ...emailTemplate[template].data, ...payloadData }
        const { render } = await import('@vue-email/render')
        const html = await render(emailTemplate[template].template as Component, allData)
        const text = await render(emailTemplate[template].template as Component, allData, { plainText: true })

        const { transport } = useNodeMailer()
        await transport.verify()
        await transport.sendMail({
          from: `"${allData.fromCompanyName}" <${allData.fromEmail}>`,
          to: allData.toEmail,
          subject: allData.emailSubject,
          html,
          text,
        })
      } catch (error) {
        console.error('function sendEmail', error)
        isSuccessful = false
      }
    })
  )

  return isSuccessful
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ email: string; otp?: string; mock?: boolean }>(event)
    const authCodeStorage = useStorage<{ type: 'email' | 'phone'; code: string; expiresAt: number }>(`data:auth:code`)
    const isDev = process.env.NODE_ENV !== 'production'
    const isMockLogin = isDev && (body.mock === true || !body.otp)

    let isSuccess = false
    let navigateTo: string | undefined = undefined

    if (isMockLogin && !body.otp && body.email) {
      const user = await findOrCreateNotionUser({ email: body.email })
      await setUserSession(
        event,
        {
          user: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isProfileComplete: user.isProfileComplete,
          },
          logged_at: new Date().toISOString(),
        },
        { maxAge: 30 * 24 * 60 * 60 * 1000 }
      )
      isSuccess = true
      navigateTo = user.isProfileComplete ? '/talents/models/dashboard' : '/jobs/create'
    } else if (!body.otp) {
      const code = generateCode(8, 'alphanumeric')
      isSuccess = await sendEmail('otp', [{ otp: code, toEmail: process.env.NODE_ENV === 'production' ? body.email : 'admin@shirsendu-bairagi.dev' }])
      await authCodeStorage.setItem(body.email, { type: 'email', code, expiresAt: Date.now() + 10 * 60 * 1000 })
    } else {
      const authData = await authCodeStorage.getItem(body.email)

      if (!authData) throw createError({ statusCode: 400, statusMessage: "OTP isn't generated" })
      else if (authData.expiresAt <= Date.now()) {
        throw createError({ statusCode: 400, statusMessage: 'OTP Expired' })
      } else if (authData.code !== body.otp) throw createError({ statusCode: 400, statusMessage: 'OTP Mismatched' })
      else {
        isSuccess = true
        const user = await findOrCreateNotionUser({ email: body.email })

        await setUserSession(
          event,
          {
            user: {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              email: user.email,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              isProfileComplete: user.isProfileComplete,
            },
            logged_at: new Date().toISOString(),
          },
          { maxAge: 30 * 24 * 60 * 60 * 1000 }
        )

        navigateTo = user.isProfileComplete ? '/talents/models/dashboard' : '/jobs/create'
      }
    }

    return { isSuccess, navigateTo }
  } catch (error: unknown) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    console.error('API auth/email POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
