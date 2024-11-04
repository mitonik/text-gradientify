import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { mathematicalItalicMap } from "./maps/mathematical-italic";
import { mathematicalBoldMap } from "./maps/mathematical-bold";
import { mathematicalBoldItalicMap } from "./maps/mathematical-bold-italic";
import { mathematicalScriptMap } from "./maps/mathematical-script";
import { mathematicalScriptBoldMap } from "./maps/mathematical-script-bold";
import chroma from "chroma-js";
import { Settings } from "../settings-editor/settings-editor";
import { mathematicalFrakturMap } from "./maps/mathematical-fraktur";
import { mathematicalBoldFrakturMap } from "./maps/mathematical-bold-fraktur";
import { mathematicalMonospaceMap } from "./maps/mathematical-monospace";
import { mathematicalDoubleStruckMap } from "./maps/mathematical-double-struck";

const DEFAULT_OUTPUT_COLOR = "000000";
const THREE_SECONDS = 3000;

interface OutputProps {
  text: string;
  settings: Settings;
}

export function Output(props: OutputProps) {
  const toast = useRef<Toast>(null);

  const {
    settings: { colors, mode, style },
    text,
  } = props;

  const trimmedText = [...text.trim()];
  const textWithAppliedStyle = trimmedText.map((letter) => {
    switch (style) {
      case "normal":
        return letter;
      case "italic":
        return mathematicalItalicMap.get(letter)
          ? mathematicalItalicMap.get(letter)
          : letter;
      case "bold":
        return mathematicalBoldMap.get(letter)
          ? mathematicalBoldMap.get(letter)
          : letter;
      case "bold-italic":
        return mathematicalBoldItalicMap.get(letter)
          ? mathematicalBoldItalicMap.get(letter)
          : letter;
      case "script":
        return mathematicalScriptMap.get(letter)
          ? mathematicalScriptMap.get(letter)
          : letter;
      case "script-bold":
        return mathematicalScriptBoldMap.get(letter)
          ? mathematicalScriptBoldMap.get(letter)
          : letter;
      case "fraktur":
        return mathematicalFrakturMap.get(letter)
          ? mathematicalFrakturMap.get(letter)
          : letter;
      case "bold-fraktur":
        return mathematicalBoldFrakturMap.get(letter)
          ? mathematicalBoldFrakturMap.get(letter)
          : letter;
      case "monospace":
        return mathematicalMonospaceMap.get(letter)
          ? mathematicalMonospaceMap.get(letter)
          : letter;
      case "double-struck":
        return mathematicalDoubleStruckMap.get(letter)
          ? mathematicalDoubleStruckMap.get(letter)
          : letter;
    }
  });

  const validColors = colors.map((color) =>
    chroma.valid(color) ? color : DEFAULT_OUTPUT_COLOR,
  );

  const characterCount = [...textWithAppliedStyle].length;

  const colorRange = chroma
    .scale(validColors)
    .mode(mode)
    .colors(characterCount);

  const code = textWithAppliedStyle
    .map((letter, index) => {
      return `<span style="color: ${colorRange[index]}">${letter}</span>`;
    })
    .join("");

  const gradientText = textWithAppliedStyle.map((letter, index) => {
    return (
      <span key={index} style={{ color: colorRange[index] }}>
        {letter}
      </span>
    );
  });

  const showInfo = async () => {
    await navigator.clipboard.writeText(code);
    toast.current?.show({
      severity: "info",
      summary: "Copied",
      detail: "Copied code to clipboard.",
      life: THREE_SECONDS,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <Toast ref={toast} />
      <div className="whitespace-pre">{gradientText}</div>
      {textWithAppliedStyle.length > 0 && (
        <Button
          className="xl:w-64"
          outlined
          icon={<span className="material-symbols-outlined">content_copy</span>}
          label="Copy HTML"
          onClick={showInfo}
        />
      )}
    </div>
  );
}
