import { Editor } from '../index';

export default function App() {
  return (
    <div className={'border flex flex-col items-center gap-4 p-10 my-20 rounded-[16px] max-w-[869px] w-full m-auto'}>
      <h1 className={'text-2xl'}>Editor Demo</h1>
      <Editor/>
    </div>
  );
}