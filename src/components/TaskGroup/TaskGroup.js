import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { message } from 'antd'

export function TaskGroup() {
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const authHeader = useAuthHeader()

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      try {
        const response = await fetch('/api/v1/tasks/', {
          method: 'GET',
          headers: { Authorization: authHeader() },
        })
        if (!response.ok) {
          const errMessage = await response.text()
          throw new Error(errMessage)
        }

        const tasks = await response.json()
        setTasks(tasks)
        console.log(tasks)
      } catch (exception) {
        message.error(exception.toString())
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return 'Content'
}
