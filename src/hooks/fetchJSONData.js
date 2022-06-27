import { message } from 'antd'

async function parseResponseData(response) {
  const contentType = response.headers.get('Content-Type')
  if (contentType === null) {
    return undefined
  }

  let data
  const mimeType = contentType.split(';', 1)[0].trim()
  switch (mimeType) {
    case 'text/plain':
    case 'text/html':
      data = await response.text()
      break
    case 'application/json':
      data = await response.json()
      break
    default:
      throw new Error(`unsupported MIME type "${mimeType}"`)
  }

  return data
}

export async function fetchJSONData(method, url, options) {
  // default options
  options = {
    onLoadingFailure: exception => {
      message.error(exception.toString())
    },
    ...options,
  }

  options.onLoadingBeginning && options.onLoadingBeginning()

  let isFinishingRequired = true
  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': options.data && 'application/json',
      },
      body: options.data && JSON.stringify(options.data),
    })
    if (!response.ok) {
      const errMessage = await parseResponseData(response)
      throw new Error(errMessage)
    }

    const data = await parseResponseData(response)
    isFinishingRequired = options.onLoadingSuccess(data) ?? isFinishingRequired
  } catch (exception) {
    isFinishingRequired =
      options.onLoadingFailure(exception) ?? isFinishingRequired
  } finally {
    if (isFinishingRequired) {
      options.onLoadingEnding && options.onLoadingEnding()
    }
  }
}
