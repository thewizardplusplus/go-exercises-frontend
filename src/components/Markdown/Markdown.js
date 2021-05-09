import { Typography } from 'antd'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function Markdown(props) {
  return (
    <Typography.Paragraph>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        components={{
          pre: 'div',

          code({ inline, className, children }) {
            const languageMatch = (className || '').match(/language-(\w+)/)
            return !inline ? (
              <SyntaxHighlighter
                language={languageMatch ? languageMatch[1] : 'text'}
                style={tomorrow}
                showLineNumbers
              >
                {children.toString().replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code>{children}</code>
            )
          },
        }}
      >
        {props.content}
      </ReactMarkdown>
    </Typography.Paragraph>
  )
}
