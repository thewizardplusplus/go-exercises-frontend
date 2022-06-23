import { useState } from 'react'
import { fetchJsonData } from './fetchJsonData.js'
import { useAuthHeader } from 'react-auth-kit'

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

export function useJsonDataFetchingWithAuth() {
  const { loading, fetchJsonData } = useJsonDataFetching()
  const authHeader = useAuthHeader()

  return {
    loading,

    fetchJsonData: async (method, url, options) => {
      await fetchJsonData(method, url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: authHeader(),
        },
      })
    },
  }
}
