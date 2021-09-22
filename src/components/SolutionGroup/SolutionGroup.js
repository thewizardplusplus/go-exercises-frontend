import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { Button, List, Typography, message } from 'antd'
import { StatusSign } from '../StatusSign/StatusSign.js'
import { SolutionDetails } from '../SolutionDetails/SolutionDetails.js'
import './SolutionGroup.css'

export function SolutionGroup(props) {
  const [loading, setLoading] = useState(false)
  const [solutions, setSolutions] = useState({ Solutions: [], TotalCount: 0 })
  const [page, setPage] = useState(1)
  const authHeader = useAuthHeader()

  const pageSize = 5
  const loadSolutions = async page => {
    setLoading(true)

    try {
      const response = await fetch(
        `/api/v1/tasks/${props.taskID}/solutions/?pageSize=${pageSize}&page=${page}`,
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
      setPage(page)
    } catch (exception) {
      message.error(exception.toString())
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadSolutions(page)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Button
        block
        disabled={loading}
        onClick={() => {
          loadSolutions(1)
        }}
      >
        Update
      </Button>
      <List
        loading={loading}
        dataSource={solutions.Solutions}
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
        pagination={{
          current: page,
          pageSize,
          total: solutions.TotalCount,
          showSizeChanger: false,
          onChange: page => {
            loadSolutions(page)
          },
        }}
      />
    </>
  )
}
