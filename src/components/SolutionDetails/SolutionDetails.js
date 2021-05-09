import { ItemDetails } from '../ItemDetails/ItemDetails.js'
import { Descriptions, Typography, Alert } from 'antd'

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
              <Alert type="success" message={props.solution.Result.Input} />
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
                type="success"
                message={props.solution.Result.ExpectedOutput}
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
                type="error"
                message={props.solution.Result.ActualOutput}
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
