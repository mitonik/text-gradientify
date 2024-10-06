import { InputTextarea } from "primereact/inputtextarea";
import { ChangeEventHandler } from "react";

interface InputProps {
  text: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export function Input(props: InputProps) {
  const { onChange, text } = props;
  return (
    <InputTextarea
      rows={5}
      autoResize
      id="input"
      cols={30}
      style={{ width: "100%" }}
      value={text}
      onChange={onChange}
    />
  );
}
