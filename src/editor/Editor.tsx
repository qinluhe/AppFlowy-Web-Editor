import { useCallback, useContext, useEffect, useMemo } from 'react';
import { EditorProps } from '@/types';
import '@/styles/index.scss';
import { initI18n } from '@/i18n/config';
import { addResourceBundle, changeLanguage } from '@/i18n';
import RichText from './RichText';
import { Descendant, Operation } from 'slate';
import { transformFromSlateData, transformToSlateData } from '@/utils/transform';
import ThemeEditor from './ThemeEditor';
import { EditorContext } from '@/editor/context';

initI18n();

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
    void (async () => {
      if (locale) {
        const resources = locale.resources || (await import(`../locales/${locale.lang}.json`)).default;
        addResourceBundle(locale.lang, 'translation', resources.translation);
        await changeLanguage(locale.lang);
      }
    })();
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