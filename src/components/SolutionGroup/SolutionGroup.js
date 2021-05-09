import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { Button, List, Typography, message } from 'antd'
import { StatusSign } from '../StatusSign/StatusSign.js'
import { SolutionDetails } from '../SolutionDetails/SolutionDetails.js'
import './SolutionGroup.css'

export function SolutionGroup(props) {
  const [loading, setLoading] = useState(false)
  const [solutions, setSolutions] = useState([])
  const authHeader = useAuthHeader()

  const loadSolutions = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/v1/tasks/${props.taskID}/solutions/`, {
        method: 'GET',
        headers: { Authorization: authHeader() },
      })
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
  }
  useEffect(() => {
    loadSolutions()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Button
        block
        disabled={loading}
        onClick={() => {
          loadSolutions()
        }}
      >
        Update
      </Button>
      <List
        loading={loading}
        dataSource={solutions}
        rowKey="ID"
        renderItem={solution => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <StatusSign
                  status={
                    solution.IsCorrect
                      ? 'success'
                      : Object.keys(solution.Result).length !== 0
                      ? 'failure'
                      : 'unknown'
                  }
                />
              }
              title={
                <Button
                  className="solution-group-solution-button"
                  type="text"
                  block
                  onClick={() => {
                    props.onSolutionSelection(solution)
                  }}
                >
                  {`#${solution.ID}`}
                  <Typography.Text code ellipsis={true}>
                    {solution.Code.replace(/\s+/g, ' ')}
                  </Typography.Text>
                </Button>
              }
              description={<SolutionDetails solution={solution} />}
            />
          </List.Item>
        )}
      />
    </>
  )
}
