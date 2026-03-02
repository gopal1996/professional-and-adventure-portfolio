import React from 'react';
import ReactMarkdown from 'react-markdown';

export function MarkdownText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => (
            <p {...props} className="mb-3 last:mb-0" />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc pl-5 mb-3 last:mb-0" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal pl-5 mb-3 last:mb-0" />
          ),
          li: ({ node, ...props }) => <li {...props} className="mb-1" />,
          strong: ({ node, ...props }) => (
            <strong {...props} className="font-semibold" />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

