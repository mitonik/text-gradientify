import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

interface InputProps {
  text: string;
  onChange: (text: string) => void;
}

export function Input(props: InputProps) {
  const { onChange, text } = props;
  return (
    <div className="flex flex-col gap-3">
      <InputTextarea
        autoResize
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%" }}
        value={text}
      />
      <div className="flex flex-wrap gap-1">
        <Button
          label="lowercase"
          onClick={() => onChange(text.toLowerCase())}
        />
        <Button
          label="UPPERCASE"
          onClick={() => onChange(text.toUpperCase())}
        />
        <Button
          label="Start Case"
          onClick={() =>
            onChange(
              text
                .toLowerCase()
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.substring(1))
                .join(" "),
            )
          }
        />
        <Button
          label="Sentence case"
          onClick={() =>
            onChange(
              text
                .toLowerCase()
                .split(". ")
                .map(
                  (sentence) =>
                    sentence[0].toUpperCase() + sentence.substring(1),
                )
                .join(". "),
            )
          }
        />
      </div>
    </div>
  );
}
