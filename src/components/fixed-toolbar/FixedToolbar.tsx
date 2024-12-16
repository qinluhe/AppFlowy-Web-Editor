import { ReactEditor } from 'slate-react';

export function FixedToolbar({ editor }: {
  editor: ReactEditor;
}) {
  console.log(editor);
  return (
    <div className={'flex items-center flex-wrap gap-2 border-b border-line-divider'}>

    </div>
  );
}

export default FixedToolbar;