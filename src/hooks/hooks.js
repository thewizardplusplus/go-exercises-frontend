import { useState } from 'react'
import { wrapHookWithJSONDataFetching } from './wrapHookWithJSONDataFetching.js'
import { useAuthHeader } from 'react-auth-kit'

export const useJSONDataFetching = wrapHookWithJSONDataFetching(() => {
  const [loading, setLoading] = useState(false)

  return {
    loading,
    options: {
      onLoadingBeginning: () => {
        setLoading(true)
      },
      onLoadingEnding: () => {
        setLoading(false)
      },
    },
  }
})

export const useJSONDataFetchingWithAuth = wrapHookWithJSONDataFetching(() => {
  const { loading, fetchJSONData } = useJSONDataFetching()
  const authHeader = useAuthHeader()

  return {
    loading,
    fetchJSONData,
    options: {
      headers: {
        Authorization: authHeader(),
      },
    },
  }
})
