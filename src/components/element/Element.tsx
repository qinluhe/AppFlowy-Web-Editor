import { RenderElementProps } from 'slate-react';

export function Element({
  attributes,
  children,
}: RenderElementProps) {

  return (
    <div {...attributes}>{children}</div>
  );
}

export default Element;