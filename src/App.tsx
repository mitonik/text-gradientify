import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import chroma from "chroma-js";
import { useId, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { ColorPicker } from "primereact/colorpicker";

const INITIAL_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const INITIAL_COLORS = ["ff2424", "328a32", "008ae5"];
const INITIAL_MODE = "rgb";
const MODES: chroma.InterpolationMode[] = [
  "hcl",
  "hsi",
  "hsl",
  "hsv",
  "lab",
  "lch",
  "lrgb",
  "oklab",
  "oklch",
  "rgb",
];
const DEFAULT_NEW_COLOR = "000000";

interface ColorSelectorProps {
  color: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  showRemove: boolean;
}

const ColorSelector = (props: ColorSelectorProps) => {
  const { color, onChange, showRemove, onRemove } = props;
  const id = useId();
  return (
    <div style={{ display: "flex", gap: "0.5rem", placeItems: "center" }}>
      <ColorPicker value={color} onChange={(e) => onChange(`${e.value}`)} />
      <InputText
        id={id}
        value={color}
        onChange={(e) => onChange(e.target.value)}
      />
      {showRemove && (
        <Button
          outlined
          onClick={onRemove}
          icon={<span className="material-symbols-outlined">close</span>}
        />
      )}
    </div>
  );
};

export function App() {
  const toast = useRef<Toast>(null);

  const [colors, setColors] = useState(INITIAL_COLORS);
  const [text, setText] = useState(INITIAL_TEXT);
  const [mode, setMode] = useState<chroma.InterpolationMode>(INITIAL_MODE);
  const validColors = colors.filter((color) => {
    if (!chroma.valid(color)) {
      return;
    }
    return color;
  });

  const colorRange = chroma
    .scale(validColors)
    .mode(mode)
    .colors([...text].length);

  let code = "";
  const gradientText = [...text.trim()].map((letter, index) => {
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

  const mappedColors = colors.map((color, index) => {
    return (
      <ColorSelector
        key={index}
        color={color}
        onRemove={() => {
          const newColors = [...colors];
          const filteredColors = newColors.filter(
            (_color, colorIndex) => colorIndex !== index,
          );
          setColors(filteredColors);
        }}
        showRemove={colors.length > 1}
        onChange={(value) => {
          const newColors = [...colors];
          newColors[index] = value;
          setColors(newColors);
        }}
      />
    );
  });

  return (
    <div
      style={{
        maxWidth: "768px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1>Text gradientify</h1>
      <Toast ref={toast} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {mappedColors}
        <div>
          <Button
            label="Add color"
            icon={<span className="material-symbols-outlined">add</span>}
            onClick={() =>
              setColors((previousColors) => [
                ...previousColors,
                DEFAULT_NEW_COLOR,
              ])
            }
          />
        </div>
      </div>

      <InputTextarea
        rows={5}
        autoResize
        id="input"
        cols={30}
        style={{ width: "100%" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <FloatLabel>
          <Dropdown
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.value)}
            options={MODES}
            optionLabel="name"
            placeholder="Select a mode"
          />
          <label htmlFor="mode">Color mode</label>
        </FloatLabel>
        {mode !== INITIAL_MODE && (
          <Button
            onClick={() => setMode(INITIAL_MODE)}
            text
            tooltip="Restore default"
            icon={<span className="material-symbols-outlined">history</span>}
          />
        )}
      </div>
      <div>
        <p>{gradientText}</p>
        <div>
          <Button
            outlined
            icon={
              <span className="material-symbols-outlined">content_copy</span>
            }
            label="Copy HTML"
            onClick={showInfo}
          />
        </div>
      </div>
    </div>
  );
}
