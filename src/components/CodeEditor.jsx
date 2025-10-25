// src/components/CodeEditor.jsx
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

export default function CodeEditor({ value, onChange }) {
  return (
    <div className="border rounded-md overflow-hidden">
      <CodeMirror
        value={value}
        height="250px"
        theme={oneDark}
        extensions={[javascript(), html(), css()]}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
}
