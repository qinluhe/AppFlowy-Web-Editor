import { Editor, EditorData, NodeType, EditorProvider } from '../index';
import { useCallback, useState } from 'react';
import { MenuItem, Select, Switch } from '@mui/material';

const initialValue: EditorData = [
  {
    type: NodeType.Paragraph,
    delta: [{ insert: 'This is editable plain text, just like a <textarea>!' }],
    children: [],
  },
  {
    type: NodeType.Heading,
    data: { level: 1 },
    delta: [{ insert: 'This is editable plain text, just like a <textarea>!' }],
    children: [],
  },
  {
    type: NodeType.Todo,
    data: {
      checked: false,
    },
    delta: [{ insert: 'This is editable plain text, just like a <textarea>!' }],
    children: [],
  },
  {
    type: NodeType.NumberedList,
    data: {
      number: 1,
    },
    delta: [{ insert: 'This is editable plain text, just like a <textarea>' }],
    children: [],
  },
  {
    type: NodeType.BulletedList,
    children: [],
    delta: [{ insert: 'This is a bulleted list' }],
  },
  {
    type: NodeType.Quote,
    delta: [{ insert: 'This is a quote' }],
    children: [],
  },
];

const languages = [
  'en',
  'ar-SA',
  'ca-ES',
  'ckb-KU',
  'cs-CZ',
  'de-DE',
  'es-VE',
  'eu-ES',
  'fa',
  'fr-CA',
  'fr-FR',
  'he',
  'hu-HU',
  'id-ID',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ru-RU',
  'sv-SE',
  'th-TH',
  'tr-TR',
  'uk-UA',
  'vi',
  'vi-VN',
  'zh-CN',
  'zh-TW',
];
export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<string>('en');
  const handleSwitchTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  return (
    <div
      className={'border text-text-title bg-bg-body flex flex-col items-center gap-4 p-10 my-20 rounded-[16px] max-w-[869px] w-full m-auto'}>
      <div className={'flex gap-4 items-center'}>
        <h1 className={'text-2xl'}>Editor Demo</h1>
        <Switch
          onClick={handleSwitchTheme}
          className={'px-4 py-2 bg-fill-primary text-text-title rounded-md'}
        />
        <Select size={'small'} className={'w-[100px]'} value={lang} onChange={(e) => setLang(e.target.value as string)}>
          {
            languages.map((lang) => (
              <MenuItem key={lang} value={lang}>{lang}</MenuItem>
            ))
          }
        </Select>

      </div>
      <div className={'h-[500px] w-full'}>
        <EditorProvider>
          <Editor locale={{
            lang,
          }} theme={theme} initialValue={initialValue}/>
        </EditorProvider>
      </div>

    </div>
  );
}