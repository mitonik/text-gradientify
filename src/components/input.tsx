import { InputTextarea } from "primereact/inputtextarea";

interface InputProps {
  text: string;
  onChange: (text: string) => void;
}

export function Input(props: InputProps) {
  const { onChange, text } = props;
  return (
    <InputTextarea
      autoResize
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%" }}
      value={text}
    />
  );
}
