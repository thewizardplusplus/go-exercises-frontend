import { wrapHookWithJSONDataFetching } from './wrapHookWithJSONDataFetching.js'
import { useState } from 'react'
import { message } from 'antd'
import { useAuthHeader, useSignOut } from 'react-auth-kit'
import { HTTPError } from './httpError.js'

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

const useJSONDataFetchingWithAuth = wrapHookWithJSONDataFetching(() => {
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

export const useJSONDataFetchingWithAuthAndErrorHandling =
  wrapHookWithJSONDataFetching(() => {
    const { loading, fetchJSONData } = useJSONDataFetchingWithAuth()
    const signOut = useSignOut()

    return {
      loading,
      fetchJSONData,
      options: {
        onLoadingFailure: exception => {
          message.error(exception.toString())

          if (exception instanceof HTTPError && exception.statusCode === 401) {
            signOut()
          }
        },
      },
    }
  })
