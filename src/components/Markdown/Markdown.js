import { Typography } from 'antd'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export function Markdown(props) {
  return (
    <Typography.Paragraph>
      <ReactMarkdown remarkPlugins={[gfm]}>{props.content}</ReactMarkdown>
    </Typography.Paragraph>
  )
}
