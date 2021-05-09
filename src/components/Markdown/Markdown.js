import { Typography, Table } from 'antd'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import React from 'react'
import './Markdown.css'

export function Markdown(props) {
  return (
    <Typography.Paragraph className="markdown-paragraph">
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

          table({ children }) {
            let columns = []
            let dataSource = []
            React.Children.forEach(children, ({ props: { children } }) => {
              React.Children.forEach(children, ({ props: { children } }) => {
                let columnData = {}
                React.Children.forEach(
                  children,
                  ({ type, props: { children } }) => {
                    switch (type) {
                      case 'th':
                        columns.push({
                          dataIndex: `column${columns.length}`,
                          title: children.toString(),
                        })
                        break
                      case 'td':
                        columnData = {
                          ...columnData,
                          [`column${
                            Object.keys(columnData).length
                          }`]: children.toString(),
                        }
                        break
                      default:
                        break
                    }
                  },
                )
                if (Object.keys(columnData).length !== 0) {
                  dataSource.push({
                    ...columnData,
                    key: dataSource.length.toString(),
                  })
                }
              })
            })

            return (
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
              />
            )
          },
        }}
      >
        {props.content}
      </ReactMarkdown>
    </Typography.Paragraph>
  )
}
