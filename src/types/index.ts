export * from './element';

import { Op } from 'quill-delta';

export interface AppFlowyEditor {
  applyData: (data: EditorData) => void;
}

export enum NodeType {
  Paragraph = 'paragraph',
  Heading = 'heading',
  NestedBlock = 'nested-block',
  Todo = 'todo_list',
  NumberedList = 'numbered_list',
  BulletedList = 'bulleted_list',
  Quote = 'quote',
}

export enum InlineType {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Strikethrough = 'strikethrough',

  FontColor = 'font_color',
  BgColor = 'bg_color',
  Href = 'href',
}

export interface EditorNode {
  type: NodeType;
  children: EditorNode[];
  data?: Record<string, unknown>;
  delta?: Op[];
}

export type EditorData = EditorNode[];

export interface EditorLocale {
  lang: string;
  resources: Record<string, string>;
}

export interface EditorProps {
  initialValue?: EditorData;
  onChange?: (value: EditorData) => void;
  locale?: EditorLocale;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
}

