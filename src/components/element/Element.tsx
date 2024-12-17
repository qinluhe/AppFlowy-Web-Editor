import { RenderElementProps } from 'slate-react';
import { NodeType } from '@/types';
import Heading from '@/components/element/Heading';
import Checkbox from '@/components/element/Checkbox';
import NumberedList from '@/components/element/NumberedList';
import BulletedList from '@/components/element/BulletedList';

export function Element({
  element,
  attributes,
  children,
}: RenderElementProps) {

  switch (element.type) {
    case NodeType.Heading:
      return <Heading {...{ attributes, children, element }} />;
    case NodeType.Todo:
      return <Checkbox {...{ attributes, children, element }} />;
    case NodeType.NumberedList:
      return <NumberedList {...{ attributes, children, element }} />;
    case NodeType.BulletedList:
      return <BulletedList {...{ attributes, children, element }} />;
  }

  return (
    <div {...attributes} data-block-type={element.type}>{children}</div>
  );
}

export default Element;