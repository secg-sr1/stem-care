import { Children, isValidElement } from 'react';
import { Typography as MuiTypography } from '@mui/material';
import TypeText from './TypeText.jsx';
function plain(children) {
  return Children.toArray(children).map(child => typeof child === 'string' || typeof child === 'number' ? child : isValidElement(child) ? child.type === 'br' ? ' ' : child.props.text ?? plain(child.props.children) : '').join('').replace(/\s+/g, ' ').trim();
}
export default function GenomeHeading({ as: Tag = 'h2', children, ...props }) {
  const text = plain(children);
  return <Tag {...props}>{text ? <TypeText text={text} /> : children}</Tag>;
}
export function GenomeTypography({ children, ...props }) {
  const heading = /^h[1-6]$/.test(props.component || props.variant || '');
  const text = heading ? plain(children) : '';
  return <MuiTypography {...props}>{text ? <TypeText text={text} /> : children}</MuiTypography>;
}
