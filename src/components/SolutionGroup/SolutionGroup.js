import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { message } from 'antd'

export function SolutionGroup(props) {
  const [loading, setLoading] = useState(false)
  const [solutions, setSolutions] = useState([])
  const authHeader = useAuthHeader()

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      try {
        const response = await fetch(
          `/api/v1/tasks/${props.taskID}/solutions/`,
          {
            method: 'GET',
            headers: { Authorization: authHeader() },
          },
        )
        if (!response.ok) {
          const errMessage = await response.text()
          throw new Error(errMessage)
        }

        const solutions = await response.json()
        setSolutions(solutions)
        console.log(solutions)
      } catch (exception) {
        message.error(exception.toString())
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return 'Content'
}
