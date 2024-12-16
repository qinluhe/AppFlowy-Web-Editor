import { Op } from 'quill-delta';

export enum NodeType {
  Paragraph = 'paragraph',
  Heading = 'heading',
}

export interface Node {
  type: NodeType;
  children: Node[];
  data: Record<string, unknown>;
  delta?: Op[];
}

export type EditorData = Node[];

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