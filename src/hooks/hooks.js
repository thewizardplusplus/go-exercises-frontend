import { wrapHookWithJSONDataFetching } from './wrapHookWithJSONDataFetching.js'
import { useState } from 'react'
import { message } from 'antd'
import { useAuthHeader } from 'react-auth-kit'

const useJSONDataFetching = wrapHookWithJSONDataFetching(() => {
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

export const useJSONDataFetchingWithErrorHandling =
  wrapHookWithJSONDataFetching(() => {
    const { loading, fetchJSONData } = useJSONDataFetching()

    return {
      loading,
      fetchJSONData,
      options: {
        onLoadingFailure: exception => {
          message.error(exception.toString())
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
