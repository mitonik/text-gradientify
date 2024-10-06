import { InputTextarea } from "primereact/inputtextarea";
import chroma from "chroma-js";
import { useState } from "react";
import { Button } from "primereact/button";
import { Output } from "./output";
import { ColorSelector } from "./color-selector";
import { RenderOptionsChooser } from "./render-options-chooser";

const INITIAL_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const INITIAL_COLORS = ["ff2424", "328a32", "008ae5"];
const INITIAL_MODE = "rgb";
const DEFAULT_NEW_COLOR = "000000";
const INITIAL_STYLE = "Latin";

export function App() {
  const [colors, setColors] = useState(INITIAL_COLORS);
  const [text, setText] = useState(INITIAL_TEXT);
  const [style, setStyle] = useState(INITIAL_STYLE);
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

  const mappedColors = colors.map((color, index) => {
    return (
      <ColorSelector
        key={index}
        color={color}
        onRemove={() => {
          const newColors = [...colors];
          const filteredColors = newColors.filter(
            (_color, colorIndex) => colorIndex !== index
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
      <RenderOptionsChooser
        mode={mode}
        onModeChange={(mode) => setMode(mode)}
        onStyleChange={(style) => setStyle(style)}
        style={style}
      />
      <Output style={style} colorRange={colorRange} text={text} />
    </div>
  );
}
