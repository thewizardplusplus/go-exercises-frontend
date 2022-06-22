export async function fetchJsonData(method, url, options) {
  options.onLoadingBeginning && options.onLoadingBeginning()

  let isSuccessful = false
  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...(options.headers || {}),
        'Content-Type': options.data && 'application/json',
      },
      body: options.data && JSON.stringify(options.data),
    })
    if (!response.ok) {
      const errMessage = await response.text()
      throw new Error(errMessage)
    }

    const data = await response.json()
    options.onLoadingSuccess(data)

    isSuccessful = true
  } catch (exception) {
    options.onLoadingFailure(exception)
  } finally {
    options.onLoadingEnding && options.onLoadingEnding(isSuccessful)
  }
}
