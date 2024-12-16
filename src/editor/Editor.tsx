import { useCallback, useEffect, useMemo } from 'react';
import { EditorProps } from '@/types';
import '../styles/index.css';
import { addResourceBundle, changeLanguage } from '@/editor/i18n';
import RichText from './RichText';
import { Descendant, Operation } from 'slate';

export function Editor({
  locale,
  theme = 'light',
  readOnly = false,
}: EditorProps) {
  useEffect(() => {
    if (locale) {
      addResourceBundle(locale.lang, 'translation', locale.resources);
      void changeLanguage(locale.lang);
    }
  }, [locale]);

  useEffect(() => {
    document.documentElement.setAttribute('data-editor-theme', theme);
  }, [theme]);

  const handleChange = useCallback((ops: Operation[], value: Descendant[]) => {
    // convert value to EditorData
    console.log(ops, value);
  }, []);

  const value = useMemo(() => {
    // convert initialValue to Descendant[]
    return undefined;
  }, []);

  return (
    <div className="w-full text-text-title border p-10 rounded-lg overflow-hidden bg-bg-body border-line-divider">
      <RichText onChange={handleChange} initialValue={value} readOnly={readOnly}/>
    </div>
  );
}

export default Editor;