import { ItemDetails } from '../ItemDetails/ItemDetails.js'
import { Descriptions, Typography, Alert } from 'antd'
import './SolutionDetails.css'

export function SolutionDetails(props) {
  return (
    <ItemDetails
      item={props.solution}
      additionDetails={
        <>
          {props.solution.Result.Input && (
            <Descriptions.Item
              label={<Typography.Text type="success">Input</Typography.Text>}
            >
              <Alert
                className="solution-details-alert"
                type="success"
                message={
                  <pre>
                    <code>{props.solution.Result.Input}</code>
                  </pre>
                }
              />
            </Descriptions.Item>
          )}

          {props.solution.Result.ExpectedOutput && (
            <Descriptions.Item
              label={
                <Typography.Text type="success">
                  Expected output
                </Typography.Text>
              }
            >
              <Alert
                className="solution-details-alert"
                type="success"
                message={
                  <pre>
                    <code>{props.solution.Result.ExpectedOutput}</code>
                  </pre>
                }
              />
            </Descriptions.Item>
          )}

          {props.solution.Result.ActualOutput && (
            <Descriptions.Item
              label={
                <Typography.Text type="danger">Actual output</Typography.Text>
              }
            >
              <Alert
                className="solution-details-alert"
                type="error"
                message={
                  <pre>
                    <code>{props.solution.Result.ActualOutput}</code>
                  </pre>
                }
              />
            </Descriptions.Item>
          )}

          {props.solution.Result.ErrMessage && (
            <Descriptions.Item
              label={
                <Typography.Text type="danger">Error message</Typography.Text>
              }
            >
              <Alert type="error" message={props.solution.Result.ErrMessage} />
            </Descriptions.Item>
          )}
        </>
      }
    />
  )
}
