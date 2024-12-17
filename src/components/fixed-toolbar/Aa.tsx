import Text from '@/assets/paragraph.svg?react';
import { Button, ButtonProps, IconButton, IconButtonProps, Popover } from '@mui/material';
import { useFocused, useReadOnly, useSlate } from 'slate-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getBlock, isBlockActive, turnToType } from '@/utils/editor';
import H1 from '@/assets/h1.svg?react';
import H2 from '@/assets/h2.svg?react';
import H3 from '@/assets/h3.svg?react';
import Quote from '@/assets/quote.svg?react';

import Paragraph from '@/assets/aa_text.svg?react';
import { NodeType } from '@/types';

function Aa() {
  const readOnly = useReadOnly();
  const focused = useFocused() && document.getSelection()?.type !== 'Node';
  const editor = useSlate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const handleHeadingClick = useCallback((level: number) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      turnToType(editor, NodeType.Heading, { level });
      handleClose();
    };
  }, [editor, handleClose]);

  const getHeadingButtonProps = useCallback((level: number) => {
    const entry = getBlock(editor);
    const activeHeadingLevel = entry ? entry[0].data?.level : -1;

    return {
      color: (activeHeadingLevel === level ? 'primary' : 'inherit') as IconButtonProps['color'],
      onClick: handleHeadingClick(level),
      size: 'small' as IconButtonProps['size'],
      disabled: readOnly || !focused,
      className: '!justify-start w-full text-left',
    } as ButtonProps;
  }, [editor, handleHeadingClick, readOnly, focused]);

  const getButtonProps = useCallback((type: NodeType) => {
    const isActive = isBlockActive(editor, type);
    return {
      color: (isActive ? 'primary' : 'inherit') as IconButtonProps['color'],
      onClick: () => {
        turnToType(editor, type);
        handleClose();
      },
      size: 'small' as IconButtonProps['size'],
      disabled: readOnly || !focused,
      className: '!justify-start w-full text-left',
    } as ButtonProps;
  }, [handleClose, editor, readOnly, focused]);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <IconButton onClick={handleOpen} disabled={readOnly || !focused} size={'small'} color={'inherit'}>
        <Text className={'w-5 h-5'}/>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseUp={e => {
          e.stopPropagation();
        }}
        disableRestoreFocus={true}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={'flex flex-col p-2 gap-2'}>
          <Button {...getHeadingButtonProps(1)} startIcon={<H1 className={'w-5 h-5'}/>}>
            {t('editor.heading', {
              level: 1,
            })}
          </Button>
          <Button startIcon={<H2 className={'w-5 h-5'}/>} {...getHeadingButtonProps(2)}>
            {t('editor.heading', {
              level: 2,
            })}
          </Button>
          <Button startIcon={<H3 className={'w-5 h-5'}/>} {...getHeadingButtonProps(3)}>
            {t('editor.heading', {
              level: 3,
            })}
          </Button>
          <Button startIcon={<Paragraph className={'w-5 h-5'}/>} {...getButtonProps(NodeType.Paragraph)}>
            {t('editor.paragraph')}
          </Button>
          <Button startIcon={<Quote className={'w-5 h-5'}/>} {...getButtonProps(NodeType.Quote)}>
            {t('editor.blockquote')}
          </Button>
        </div>

      </Popover>
    </>
  );
}

export default Aa;