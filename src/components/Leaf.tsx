import { RenderLeafProps } from 'slate-react';
import { renderColor } from '@/lib/color';

function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  const style: React.CSSProperties = {};
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.bg_color) {
    style.backgroundColor = renderColor(leaf.bg_color);
  }
  if (leaf.font_color) {
    style.color = renderColor(leaf.font_color);
  }

  return <span {...attributes} style={style}>{children}</span>;
}

export default Leaf;