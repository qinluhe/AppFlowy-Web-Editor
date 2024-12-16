import { useCallback, useMemo } from 'react';
import { Editable, withReact, Slate } from 'slate-react';
import {
  createEditor,
  Descendant, Operation,
} from 'slate';
import { withHistory } from 'slate-history';
import { FixedToolbar } from '@/components/fixed-toolbar';
import { useTranslation } from 'react-i18next';
import Element from '../components/element/Element';

const defaultInitialValue = [
  {
    type: 'paragraph',
    children: [{ type: 'text', children: [{ text: '' }] }],
  },
];

export interface RichTextProps {
  readOnly?: boolean;
  onChange?: (ops: Operation[], value: Descendant[]) => void;
  initialValue?: Descendant[];
}

const RichText = ({ readOnly, onChange, initialValue = defaultInitialValue }: RichTextProps) => {
  const { t } = useTranslation();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleOnChange = useCallback((value: Descendant[]) => {
    onChange?.(editor.operations, value);
  }, [editor, onChange]);

  return (
    <Slate editor={editor} onChange={handleOnChange} initialValue={initialValue}>
      <FixedToolbar editor={editor}/>
      <Editable
        readOnly={readOnly}
        className={'outline-none'}
        placeholder={t('placeholder')}
        renderElement={Element}
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