import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { List, Avatar, Typography, message } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
} from '@ant-design/icons'
import { SolutionDetails } from '../SolutionDetails/SolutionDetails.js'
import './SolutionGroup.css'

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
      } catch (exception) {
        message.error(exception.toString())
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <List
      loading={loading}
      dataSource={solutions}
      rowKey="ID"
      renderItem={solution => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                className="solution-avatar"
                icon={
                  solution.IsCorrect ? (
                    // success
                    <Typography.Text type="success">
                      <CheckOutlined />
                    </Typography.Text>
                  ) : Object.keys(solution.Result).length !== 0 ? (
                    // failure
                    <Typography.Text type="success">
                      <CloseOutlined />
                    </Typography.Text>
                  ) : (
                    // in progress
                    <QuestionOutlined />
                  )
                }
              />
            }
            title={`#${solution.ID}`}
            description={<SolutionDetails solution={solution} />}
          />
        </List.Item>
      )}
    />
  )
}
