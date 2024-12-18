import { useCallback } from 'react';
import { Editable, Slate, ReactEditor } from 'slate-react';
import {
  Descendant, Operation,
} from 'slate';
import { FixedToolbar } from '@/components/fixed-toolbar';
import Element from '../components/element/Element';
import Leaf from '@/components/Leaf';
import { useKeydown } from '@/editor/useKeydown';
import { useTranslation } from '@/i18n';

const defaultInitialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export interface RichTextProps {
  readOnly?: boolean;
  onChange?: (ops: Operation[], value: Descendant[]) => void;
  initialValue?: Descendant[];
  editor: ReactEditor;
}

const RichText = ({ editor, readOnly, onChange, initialValue = defaultInitialValue }: RichTextProps) => {
  const { t } = useTranslation();

  const handleOnChange = useCallback((value: Descendant[]) => {
    onChange?.(editor.operations, value);
  }, [editor, onChange]);

  const handleKeyDown = useKeydown(editor);

  return (
    <Slate editor={editor} onChange={handleOnChange} initialValue={initialValue}>
      {!readOnly && <FixedToolbar/>}
      <Editable
        readOnly={readOnly}
        className={'outline-none flex-1 h-auto px-5 py-3'}
        placeholder={t('placeholder')}
        renderElement={Element}
        renderLeaf={Leaf}
        onKeyDown={handleKeyDown}
        renderPlaceholder={({ children, attributes }) => (
          <div {...attributes}>
            <p>{children}</p>
          </div>
        )}
        autoComplete={'off'}
        autoFocus
        spellCheck={false}
      />
    </Slate>
  );
};

export default RichText;