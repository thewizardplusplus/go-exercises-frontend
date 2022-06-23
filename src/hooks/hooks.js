import { useState } from 'react'
import { fetchJSONData } from './fetchJSONData.js'
import { useAuthHeader } from 'react-auth-kit'

export function useJSONDataFetching() {
  const [loading, setLoading] = useState(false)

  return {
    loading,

    fetchJSONData: async (method, url, options) => {
      await fetchJSONData(method, url, {
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

export function useJSONDataFetchingWithAuth() {
  const { loading, fetchJSONData } = useJSONDataFetching()
  const authHeader = useAuthHeader()

  return {
    loading,

    fetchJSONData: async (method, url, options) => {
      await fetchJSONData(method, url, {
        ...options,
        headers: {
          ...(options.headers ?? {}),
          Authorization: authHeader(),
        },
      })
    },
  }
}
