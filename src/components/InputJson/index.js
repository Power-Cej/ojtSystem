// import React, { useState, useCallback } from "react";
// import { EditorView } from "@codemirror/view";
// import CodeMirror from "@uiw/react-codemirror";
// import { json } from "@codemirror/lang-json";
// import { oneDark } from "@codemirror/theme-one-dark";
// import { linter, Diagnostic } from "@codemirror/lint";

// const noop = () => {};

// const defaultProps = {
//   type: "text",
//   onChange: noop,
// };

// function InputJson({ className, defaultValue, onChange, ...props }) {
//   const [value, setValue] = useState(
//     JSON.stringify(defaultValue, null, 4) || ""
//   );
//   // Custom JSON linter function
//   const jsonLinter = linter((view) => {
//     const diagnostics = [];
//     try {
//       JSON.parse(view.state.doc.toString());
//     } catch (error) {
//       const match = error.message.match(/position (\d+)/);
//       const position = match ? parseInt(match[1], 10) : 0;

//       diagnostics.push({
//         from: position,
//         to: position + 1,
//         severity: "error",
//         message: error.message,
//       });
//     }
//     return diagnostics;
//   });

//   const handleChange = useCallback(
//     (newValue) => {
//       setValue(newValue);
//       try {
//         const parsedJson = JSON.parse(newValue);
//         onChange(parsedJson);
//       } catch (error) {
//         console.error("Invalid JSON:", error);
//       }
//     },
//     [onChange]
//   );

//   return (
//     <CodeMirror
//       value={value}
//       height="300px"
//       extensions={[json(), jsonLinter, EditorView.lineWrapping]}
//       theme={oneDark}
//       onChange={handleChange}
//       basicSetup={{
//         lineNumbers: true,
//         foldGutter: true,
//         matchBrackets: true,
//         autoCloseBrackets: true,
//       }}
//       {...props}
//     />
//   );
// }

// InputJson.defaultProps = defaultProps;

// export default InputJson;

import React, { useState, useCallback } from "react";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { linter } from "@codemirror/lint";

const noop = () => {};

const defaultProps = {
  type: "text",
  onChange: noop,
  onError: noop, // Callback to inform parent about JSON validation state
};

function InputJson({ className, defaultValue, onChange, onError, ...props }) {
  const [value, setValue] = useState(
    JSON.stringify(defaultValue, null, 4) || ""
  );
  const [error, setError] = useState("");

  // Custom JSON linter function
  const jsonLinter = linter((view) => {
    const diagnostics = [];
    try {
      JSON.parse(view.state.doc.toString());
      if (error) {
        setError("");
        onError(true);
      }
    } catch (err) {
      const match = err.message.match(/position (\d+)/);
      const position = match ? parseInt(match[1], 10) : 0;

      diagnostics.push({
        from: position,
        to: position + 1,
        severity: "error",
        message: err.message,
      });

      setError(err.message);
      onError(false);
    }
    return diagnostics;
  });

  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);
      try {
        const parsedJson = JSON.parse(newValue);
        setError("");
        onError(true);
        onChange(parsedJson);
      } catch (err) {
        setError(err.message);
        onError(false);
      }
    },
    [onChange, onError]
  );

  return (
    <div>
      <CodeMirror
        value={value}
        height="300px"
        extensions={[json(), jsonLinter, EditorView.lineWrapping]}
        theme={oneDark}
        onChange={handleChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          matchBrackets: true,
          autoCloseBrackets: true,
        }}
        {...props}
      />
      {error && (
        <div style={{ color: "red", marginTop: "8px" }}>❌ Error: {error}</div>
      )}
    </div>
  );
}

InputJson.defaultProps = defaultProps;

export default InputJson;
