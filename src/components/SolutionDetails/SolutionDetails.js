import { ItemDetails } from '../ItemDetails/ItemDetails.js'
import { Descriptions, Typography } from 'antd'
import { TestCase } from '../TestCase/TestCase.js'

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
              <TestCase
                type="success"
                message={props.solution.Result.Input}
                preformatted
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
              <TestCase
                type="success"
                message={props.solution.Result.ExpectedOutput}
                preformatted
              />
            </Descriptions.Item>
          )}

          {props.solution.Result.ActualOutput && (
            <Descriptions.Item
              label={
                <Typography.Text type="danger">Actual output</Typography.Text>
              }
            >
              <TestCase
                type="error"
                message={props.solution.Result.ActualOutput}
                preformatted
              />
            </Descriptions.Item>
          )}

          {props.solution.Result.ErrMessage && (
            <Descriptions.Item
              label={
                <Typography.Text type="danger">Error message</Typography.Text>
              }
            >
              <TestCase
                type="error"
                message={props.solution.Result.ErrMessage}
              />
            </Descriptions.Item>
          )}
        </>
      }
    />
  )
}
