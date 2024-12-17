import { useFocused, useReadOnly, useSlate } from 'slate-react';
import { isBlockActive, turnToType } from '@/utils/editor';
import { useCallback } from 'react';
import { NodeType } from '@/types';
import { IconButton, IconButtonProps } from '@mui/material';
import Checkbox from '@/assets/checkbox.svg?react';
import NumberedList from '@/assets/numbered_list.svg?react';
import BulletedList from '@/assets/bulleted_list.svg?react';

function List() {
  const readOnly = useReadOnly();
  const focused = useFocused() && document.getSelection()?.type !== 'Node';
  const editor = useSlate();
  const handleClick = useCallback((type: NodeType) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      turnToType(editor, type);
    };
  }, [editor]);

  const getButtonProps = useCallback((type: NodeType) => {
    const isActive = isBlockActive(editor, type);
    return {
      color: (isActive ? 'primary' : 'inherit') as IconButtonProps['color'],
      onClick: handleClick(type),
      size: 'small' as IconButtonProps['size'],
      disabled: readOnly || !focused,
      className: 'font-medium',
    };
  }, [editor, handleClick, readOnly, focused]);
  return (
    <>
      <IconButton {...getButtonProps(NodeType.Todo)}>
        <Checkbox className={'w-6 h-6'}/>
      </IconButton>

      <IconButton {...getButtonProps(NodeType.BulletedList)}>
        <BulletedList className={'w-6 h-6'}/>
      </IconButton>
      <IconButton {...getButtonProps(NodeType.NumberedList)}>
        <NumberedList className={'w-6 h-6'}/>
      </IconButton>
    </>
  );
}

export default List;