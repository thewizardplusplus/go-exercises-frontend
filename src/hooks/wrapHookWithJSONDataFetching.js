import { fetchJSONData } from './fetchJSONData.js'

export function wrapHookWithJSONDataFetching(useHook) {
  return () => {
    const {
      options: hookOptions,
      fetchJSONData: hookFetchJSONData,
      ...restHookResults
    } = useHook()

    return {
      ...restHookResults,

      fetchJSONData: async (method, url, options) => {
        await (hookFetchJSONData ?? fetchJSONData)(method, url, {
          ...options,
          ...hookOptions,
          headers: {
            ...(options.headers ?? {}),
            ...(hookOptions.headers ?? {}),
          },
        })
      },
    }
  }
}
