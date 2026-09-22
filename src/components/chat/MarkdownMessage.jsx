import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const plugins = [remarkGfm];
const components = {
  img: () => null,
  a: ({ href, children }) => /^https?:\/\//i.test(href || '') ? <a href={href} target="_blank" rel="noopener noreferrer nofollow">{children}</a> : <span>{children}</span>,
};
export default memo(function MarkdownMessage({ content }) {
  return <ReactMarkdown skipHtml remarkPlugins={plugins} components={components}>{content.replace(/<!--[\s\S]*?(?:-->|$)/g, '')}</ReactMarkdown>;
});
