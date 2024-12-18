import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { isMarkActive } from '@/lib/editor';
import { useFocused, useReadOnly, useSlate } from 'slate-react';
import { InlineType } from '@/types';
import ColorTheme from '@/assets/color_theme.svg?react';
import FontColorIcon from '@/assets/font_color.svg?react';

import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from '@/i18n';

import { ColorEnum, renderColor } from '@/lib/color';

function Color() {
  const readOnly = useReadOnly();
  const focused = useFocused() && document.getSelection()?.type !== 'Node';
  const editor = useSlate();
  const isActive = isMarkActive(editor, InlineType.BgColor) || isMarkActive(editor, InlineType.FontColor);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const editorTextColors = useMemo(() => {
    return [{
      label: t('editor.fontColorDefault'),
      color: '',
    }, {
      label: t('editor.fontColorGray'),
      color: 'rgb(120, 119, 116)',
    }, {
      label: t('editor.fontColorBrown'),
      color: 'rgb(159, 107, 83)',
    }, {
      label: t('editor.fontColorOrange'),
      color: 'rgb(217, 115, 13)',
    }, {
      label: t('editor.fontColorYellow'),
      color: 'rgb(203, 145, 47)',
    }, {
      label: t('editor.fontColorGreen'),
      color: 'rgb(68, 131, 97)',
    }, {
      label: t('editor.fontColorBlue'),
      color: 'rgb(51, 126, 169)',
    }, {
      label: t('editor.fontColorPurple'),
      color: 'rgb(144, 101, 176)',
    }, {
      label: t('editor.fontColorPink'),
      color: 'rgb(193, 76, 138)',
    }, {
      label: t('editor.fontColorRed'),
      color: 'rgb(212, 76, 71)',
    }];
  }, [t]);

  const editorBgColors = useMemo(() => {
    return [{
      label: t('editor.backgroundColorDefault'),
      color: '',
    }, {
      label: t('editor.backgroundColorLime'),
      color: ColorEnum.Lime,
    }, {
      label: t('editor.backgroundColorAqua'),
      color: ColorEnum.Aqua,
    }, {
      label: t('editor.backgroundColorOrange'),
      color: ColorEnum.Orange,
    }, {
      label: t('editor.backgroundColorYellow'),
      color: ColorEnum.Yellow,
    }, {
      label: t('editor.backgroundColorGreen'),
      color: ColorEnum.Green,
    }, {
      label: t('editor.backgroundColorBlue'),
      color: ColorEnum.Blue,
    }, {
      label: t('editor.backgroundColorPurple'),
      color: ColorEnum.Purple,
    }, {
      label: t('editor.backgroundColorPink'),
      color: ColorEnum.Pink,
    }, {
      label: t('editor.backgroundColorRed'),
      color: ColorEnum.LightPink,
    }];
  }, [t]);

  const handlePickedColor = useCallback((format: InlineType, color: string) => {
    if (color) {
      editor.addMark(format, color);
    } else {
      editor.removeMark(format);
    }
    setOpen(false);
  }, [editor]);

  const popoverContent = useMemo(() => {
    return <div className={'p-3 flex flex-col gap-3 w-[200px]'}>
      <div className={'flex flex-col gap-2'}>
        <div className={'text-muted-foreground text-xs'}>{t('editor.textColor')}</div>
        <div className={'flex flex-wrap gap-1.5'}>
          {editorTextColors.map((color, index) => {
            return <Tooltip
              key={index}
            >
              <TooltipContent>{color.label}</TooltipContent>
              <TooltipTrigger>
                <div
                  className={'h-6 relative w-6 flex cursor-pointer items-center justify-center'}
                  onClick={() => handlePickedColor(InlineType.FontColor, color.color)}
                  style={{
                    color: color.color || 'var(--foreground)',
                  }}
                >
                  <FontColorIcon/>
                </div>
              </TooltipTrigger>

            </Tooltip>;
          })}
        </div>
      </div>
      <div className={'flex flex-col gap-2'}>
        <div className={'text-muted-foreground text-xs'}>{t('editor.backgroundColor')}</div>

        <div className={'flex flex-wrap gap-1.5'}>
          {editorBgColors.map((color, index) => {
            return <Tooltip
              key={index}
            >
              <TooltipContent>{color.label}</TooltipContent>
              <TooltipTrigger>
                <div
                  key={index}
                  className={'h-6 relative w-6 overflow-hidden flex items-center rounded-[6px] cursor-pointer justify-center'}
                  onClick={() => handlePickedColor(InlineType.BgColor, color.color)}
                >
                  <div
                    className={`w-full h-full absolute top-0 left-0 rounded-[6px] border-2`}
                    style={{
                      borderColor: renderColor(color.color),
                    }}
                  />
                  <div
                    className={'w-full h-full opacity-50 hover:opacity-100 z-[1]'}
                    style={{
                      backgroundColor: renderColor(color.color),
                    }}
                  />
                </div>

              </TooltipTrigger>

            </Tooltip>;
          })}
        </div>
      </div>
    </div>;
  }, [editorBgColors, editorTextColors, handlePickedColor, t]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={'ghost'} size={'icon'} onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
        }} disabled={readOnly || !focused} color={
          isActive ? 'primary' : 'secondary'
        }>
          <ColorTheme className={'!w-5 !h-5'}/>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align={'center'}
        sideOffset={4}
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}>
        <TooltipProvider>
          {popoverContent}
        </TooltipProvider>
      </PopoverContent>
    </Popover>
  );
}

export default Color;