# AppFlowy Web Editor

A modern editor library with support for rich text, markdown, and code editing.

## ✨ Features

- 🌓 Day/Night mode switching
- 🌍 Multi-language support
- 📱 Responsive design
- 💪 TypeScript support
- 📝 Rich text, markdown, and code editing
- 📦 Easy to integrate
- 🎉 And more!

## 📦 Installation

To install the AppFlowy Web Editor, run the following command:

```bash
npm install @appflowyinc/editor

# or

yarn add @appflowyinc/editor

# or

pnpm add @appflowyinc/editor
```

## 🚀 Quick Start

To use the AppFlowy Web Editor, import the `Editor` and `EditorProvider` components from the package and wrap your app

```tsx

import { Editor, EditorProvider } from '@appflowyinc/editor';

const App = () => {
  return <EditorProvider>
    <Editor/>
  </EditorProvider>
};

export default App;
```

## 📚 Apply Data

You can get `editor` from the `useEditor` hook and apply data to the editor.

```tsx
import { Editor, EditorProvider, useEditor, NodeType } from '@appflowyinc/editor';

const App = () => {
  const editor = useEditor();

  useEffect(() => {
    editor.applyData({
      type: NodeType.Paragraph,
      delta: [
        {
          insert: 'Hello, World!',
        },
      ],
      children: []
    });
  }, []);

  return
  <Editor/>;
};

const Main = () => {
  return <EditorProvider>
    <App/>
  </EditorProvider>;
};

export default App;
```

## 💡 Theme Switching

The AppFlowy Web Editor supports theme switching between light and dark modes. You can customize the themes by passing
the `theme` prop to the `Editor` component.

```tsx
import { Editor, EditorProvider } from '@appflowyinc/editor';

const App = () => {
  return <EditorProvider>
    <Editor theme={'dark'}/>
  </EditorProvider>;
};

export default App;
```

## 🌍 Multi-language Usage

The AppFlowy Web Editor supports multiple languages. You can customize the language by passing the `language` prop to
the `Editor` component.

```tsx

import { Editor, EditorProvider } from '@appflowyinc/editor';
import zh from '@appflowyinc/editor/locales/zh';

const App = () => {
  return <EditorProvider>
    <Editor locale={{
      lang: 'zh',
      resources: zh,
    }}/>
  </EditorProvider>;
};

export default App;
```

## 📖 API

## 🔨 Development Guide

### Development Mode

```
# Install dependencies
pnpm i

# Start development server
pnpm run dev

# Build library
pnpm run build
```

To run the demo locally:

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.
![img.png](img.png)

Switch between light and dark mode by clicking the theme switcher in the top right corner.
![img_1.png](img_1.png)

## 📄 License

MIT License

```

[]: # (END) README.md


