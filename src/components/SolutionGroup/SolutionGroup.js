import { useJSONDataFetchingWithAuthAndErrorHandling } from '../../hooks/hooks.js'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, List } from 'antd'
import { StatusSign } from '../StatusSign/StatusSign.js'
import { SolutionDetails } from '../SolutionDetails/SolutionDetails.js'
import './SolutionGroup.css'

const pageSize = 5

export function SolutionGroup(props) {
  const { loading, fetchJSONData } =
    useJSONDataFetchingWithAuthAndErrorHandling()
  const [solutions, setSolutions] = useState({ Solutions: [], TotalCount: 0 })
  const { page: defaultPage } = useParams()
  const [page, setPage] = useState(parseInt(defaultPage, 10) || 1)

  const loadSolutions = async (page, additionalHandler) => {
    const url =
      props.solutionID === undefined
        ? `/api/v1/tasks/${props.taskID}/solutions/?pageSize=${pageSize}&page=${page}`
        : `/api/v1/solutions/${props.solutionID}`
    await fetchJSONData('GET', url, {
      onLoadingSuccess: data => {
        const solutions =
          props.solutionID === undefined
            ? data
            : { Solutions: [data], TotalCount: 1 }
        setSolutions(solutions)
        setPage(props.solutionID === undefined ? page : 1)
        additionalHandler && additionalHandler()
      },
    })
  }
  useEffect(() => {
    loadSolutions(page)
  }, [props.solutionID]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {props.solutionID !== undefined && (
        <Button
          className="solution-group-general-button"
          type="dashed"
          block
          disabled={loading}
          onClick={() => {
            props.onReturningToAllSolutions()
          }}
        >
          &lt;&lt; Back to all solutions
        </Button>
      )}
      <Button
        className="solution-group-general-button"
        block
        disabled={loading}
        onClick={() => {
          loadSolutions(1, props.onSolutionUpdate)
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
                  statusName={
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
                  type="link"
                  block
                  onClick={() => {
                    props.onSolutionSelection(solution)
                  }}
                >
                  {`Solution #${solution.ID}`}
                </Button>
              }
              description={<SolutionDetails solution={solution} />}
            />
          </List.Item>
        )}
        pagination={{
          current: page,
          total: solutions.TotalCount,
          pageSize,
          showSizeChanger: false,

          onChange: page => {
            const url =
              page !== 1
                ? `/tasks/${props.taskID}/solutions/page/${page}`
                : `/tasks/${props.taskID}/solutions`
            window.history.replaceState(null, '', url)

            loadSolutions(page)
          },
        }}
      />
    </>
  )
}
