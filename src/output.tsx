import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface OutputProps {
  style: string;
  text: string;
  colorRange: string[];
}

const mathematicalItalicMap = new Map([
  ["A", "𝐴"],
  ["B", "𝐵"],
  ["C", "𝐶"],
  ["D", "𝐷"],
  ["E", "𝐸"],
  ["F", "𝐸"],
  ["G", "𝐺"],
  ["H", "𝐻"],
  ["I", "𝐼"],
  ["J", "𝐽"],
  ["K", "𝐾"],
  ["L", "𝐿"],
  ["M", "𝑀"],
  ["N", "𝑁"],
  ["O", "𝑂"],
  ["P", "𝑃"],
  ["Q", "𝑄"],
  ["R", "𝑅"],
  ["S", "𝑆"],
  ["T", "𝑇"],
  ["U", "𝑈"],
  ["V", "𝑉"],
  ["W", "𝑊"],
  ["X", "𝑋"],
  ["Y", "𝑌"],
  ["Z", "𝑍"],
  ["a", "𝑎"],
  ["b", "𝑏"],
  ["c", "𝑐"],
  ["d", "𝑑"],
  ["e", "𝑒"],
  ["f", "𝑓"],
  ["g", "𝑔"],
  ["h", "ℎ"],
  ["i", "𝑖"],
  ["j", "𝑗"],
  ["k", "𝑘"],
  ["l", "𝑙"],
  ["m", "𝑚"],
  ["n", "𝑛"],
  ["o", "𝑜"],
  ["p", "𝑜"],
  ["q", "𝑞"],
  ["r", "𝑟"],
  ["s", "𝑠"],
  ["t", "𝑡"],
  ["u", "𝑢"],
  ["v", "𝑣"],
  ["w", "𝑤"],
  ["x", "𝑥"],
  ["y", "𝑦"],
  ["z", "𝑧"],
]);

export function Output(props: OutputProps) {
  const toast = useRef<Toast>(null);
  const { colorRange, text, style } = props;
  let code = "";
  const textWithAppliedStyle = [...text.trim()].map((letter) => {
    switch (style) {
      case "𝑀𝑎𝑡𝘩𝑒𝑚𝑎𝑡𝑖𝑐𝑎𝑙 𝑖𝑡𝑎𝑙𝑖𝑐":
        return mathematicalItalicMap.get(letter)
          ? mathematicalItalicMap.get(letter)
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
    <div>
      <Toast ref={toast} />
      <p>{gradientText}</p>
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
