import { useState } from 'react'
import { fetchJsonData } from './fetchJsonData.js'

export function useJsonDataFetching() {
  const [loading, setLoading] = useState(false)

  return {
    loading,

    fetchJsonData: async (method, url, options) => {
      await fetchJsonData(method, url, {
        ...options,

        onLoadingBeginning: () => {
          setLoading(true)
        },
        onLoadingEnding: () => {
          setLoading(false)
        },
      })
    },
  }
}
