import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { mathematicalItalicMap } from "./maps/mathematical-italic";
import { mathematicalBoldMap } from "./maps/mathematical-bold";
import { mathematicalBoldItalicMap } from "./maps/mathematical-bold-italic";
import { mathematicalScriptMap } from "./maps/mathematical-script";
import { mathematicalScriptBoldMap } from "./maps/mathematical-script-bold";

interface OutputProps {
  style: string;
  text: string;
  colorRange: string[];
}

export function Output(props: OutputProps) {
  const toast = useRef<Toast>(null);
  const { colorRange, text, style } = props;
  let code = "";
  const textWithAppliedStyle = [...text.trim()].map((letter) => {
    switch (style) {
      case "𝐼𝑡𝑎𝑙𝑖𝑐":
        return mathematicalItalicMap.get(letter)
          ? mathematicalItalicMap.get(letter)
          : letter;
      case "𝐁𝐨𝐥𝐝":
        return mathematicalBoldMap.get(letter)
          ? mathematicalBoldMap.get(letter)
          : letter;
      case "𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄":
        return mathematicalBoldItalicMap.get(letter)
          ? mathematicalBoldItalicMap.get(letter)
          : letter;
      case "𝒮𝒸𝓇𝒾𝓅𝓉":
        return mathematicalScriptMap.get(letter)
          ? mathematicalScriptMap.get(letter)
          : letter;
      case "𝓢𝓬𝓻𝓲𝓹𝓽 𝓑𝓸𝓵𝓭":
        return mathematicalScriptBoldMap.get(letter)
          ? mathematicalScriptBoldMap.get(letter)
          : letter;
      default:
        return letter;
    }
  });
  const gradientText = textWithAppliedStyle.map((letter, index) => {
    code += `<span style="color: ${colorRange[index]}">${letter}</span>`;
    return (
      <span key={index} style={{ color: colorRange[index] }}>
        {letter}
      </span>
    );
  });
  const showInfo = () => {
    navigator.clipboard.writeText(code);
    toast.current?.show({
      severity: "info",
      summary: "Copied",
      detail: "Copied code to clipboard.",
      life: 3000,
    });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toast ref={toast} />
      <div>{gradientText}</div>
      <div>
        <Button
          outlined
          icon={<span className="material-symbols-outlined">content_copy</span>}
          label="Copy HTML"
          onClick={showInfo}
        />
      </div>
    </div>
  );
}
