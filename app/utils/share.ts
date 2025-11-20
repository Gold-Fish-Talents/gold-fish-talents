export interface ShareAsset {
  name: string
  imageUrl?: string
  url: string
}

export default async function (asset: ShareAsset) {
  const { share, isSupported } = useShare()
  const { copy } = useClipboard()

  if (!isSupported) {
    await copy(`${asset.name}\n\n${asset.url}`)
    return
  }

  try {
    const content = asset.imageUrl
      ? await $fetch<Blob>(asset.imageUrl, {
          responseType: 'blob',
        })
      : undefined

    const files = content ? [new File([content], `${asset.name}.jpg`, { type: 'image/jpeg' })] : undefined
    await share({
      title: asset.name,
      text: `${asset.name}\n`,
      url: asset.url,
      files,
    })
  } catch (error) {
    console.error('Utils Share', error)
  }
}
