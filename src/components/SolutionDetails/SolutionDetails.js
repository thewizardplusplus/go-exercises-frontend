import { ItemDetails } from '../ItemDetails/ItemDetails.js'
import { Typography } from 'antd'
import { TestCase } from '../TestCase/TestCase.js'
import './SolutionDetails.css'

export function SolutionDetails(props) {
  const quotedStringPattern = /"([^"]|\\.)*"/
  return (
    <ItemDetails
      item={props.solution}
      additionDetails={[
        props.solution.Result.Input && {
          key: 1,
          label: <Typography.Text type="success">Input</Typography.Text>,
          content: (
            <TestCase
              type="success"
              message={props.solution.Result.Input}
              preformatted
            />
          ),
        },

        props.solution.Result.ExpectedOutput && {
          key: 2,
          label: (
            <Typography.Text type="success">Expected output</Typography.Text>
          ),
          content: (
            <TestCase
              type="success"
              message={props.solution.Result.ExpectedOutput}
              preformatted
            />
          ),
        },

        props.solution.Result.ActualOutput && {
          key: 3,
          label: <Typography.Text type="danger">Actual output</Typography.Text>,
          content: (
            <TestCase
              type="error"
              message={props.solution.Result.ActualOutput}
              preformatted
            />
          ),
        },

        props.solution.Result.ErrMessage && {
          key: 4,
          label: <Typography.Text type="danger">Error message</Typography.Text>,
          content: (
            <TestCase
              type="error"
              message={
                <>
                  {props.solution.Result.ErrMessage}

                  {props.solution.Result.ErrMessage.match(
                    quotedStringPattern,
                  ) && (
                    <Typography.Paragraph className="solution-details-preformatted-paragraph">
                      <pre>
                        {JSON.parse(
                          props.solution.Result.ErrMessage.match(
                            quotedStringPattern,
                          )[0],
                        )}
                      </pre>
                    </Typography.Paragraph>
                  )}
                </>
              }
            />
          ),
        },
      ]}
    />
  )
}
