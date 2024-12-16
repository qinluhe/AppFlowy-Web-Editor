import { useMemo } from 'react';
import { Editable, withReact, Slate } from 'slate-react';
import {
  createEditor,
  Descendant,
} from 'slate';
import { withHistory } from 'slate-history';
import { FixedToolbar } from '@/components/fixed-toolbar';
import { useTranslation } from 'react-i18next';

const defaultInitialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export interface RichTextProps {
  readOnly?: boolean;
  onChange?: (value: Descendant[]) => void;
  initialValue?: Descendant[];
}

const RichText = ({ readOnly, onChange, initialValue = defaultInitialValue }: RichTextProps) => {
  const { t } = useTranslation();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} onChange={onChange} initialValue={initialValue}>
      <FixedToolbar editor={editor}/>
      <Editable
        readOnly={readOnly}
        className={'outline-none'}
        placeholder={t('placeholder')}
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