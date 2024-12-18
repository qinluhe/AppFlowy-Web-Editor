import { useCallback, useContext, useEffect, useMemo } from 'react';
import { EditorProps } from '@/types';
import '../styles/index.css';
import { addResourceBundle, changeLanguage } from '@/i18n.ts';
import RichText from './RichText';
import { Descendant, Operation } from 'slate';
import { transformFromSlateData, transformToSlateData } from '@/utils/transform';
import ThemeEditor from './ThemeEditor';
import { EditorContext } from '@/editor/context';

export function Editor({
  locale,
  theme = 'light',
  readOnly = false,
  onChange,
  initialValue: initialValueProp,
}: EditorProps) {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('EditorProvider must be used');
  }

  useEffect(() => {
    if (locale) {
      addResourceBundle(locale.lang, 'translation', locale.resources);
      void changeLanguage(locale.lang);
    }
  }, [locale]);

  useEffect(() => {
    document.documentElement.setAttribute('data-editor-theme', theme);
  }, [theme]);

  const handleChange = useCallback((_: Operation[], value: Descendant[]) => {
    // convert value to EditorData
    const data = transformFromSlateData(value);
    console.log({
      slateData: value,
      editorData: data,
    });
    onChange?.(data);
  }, [onChange]);

  const value = useMemo(() => {
    // convert initialValue to Descendant[]
    if (!initialValueProp) return undefined;
    return transformToSlateData(initialValueProp);
  }, [initialValueProp]);

  return (
    <ThemeEditor theme={theme}>
      <div
        className="appflowy-editor flex flex-col selection:bg-content-blue-100 w-full text-text-title overflow-hidden">
        <RichText editor={context.editor} onChange={handleChange} initialValue={value} readOnly={readOnly}/>
      </div>
    </ThemeEditor>
  );
}

export default Editor;