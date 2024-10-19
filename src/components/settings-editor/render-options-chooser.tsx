import { InterpolationMode } from "chroma-js";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { Style } from "./settings-editor";
import { STYLES } from "./styles";

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

interface RenderOptionsChooserProps {
  onModeChange: (mode: InterpolationMode) => void;
  onStyleChange: (style: Style) => void;
  mode: InterpolationMode;
  style: Style;
}

export function RenderOptionsChooser(props: RenderOptionsChooserProps) {
  const { mode, onModeChange, onStyleChange, style } = props;
  return (
    <div className="flex gap-1">
      <FloatLabel style={{ width: "100%" }}>
        <Dropdown
          style={{ width: "100%" }}
          id="mode"
          value={mode}
          onChange={(e) => onModeChange(e.value)}
          options={MODES}
          optionLabel="name"
          placeholder="Select a mode"
        />
        <label htmlFor="mode">Color mode</label>
      </FloatLabel>
      <FloatLabel style={{ width: "100%" }}>
        <Dropdown
          style={{ width: "100%" }}
          id="style"
          options={STYLES}
          value={style}
          onChange={(e) => onStyleChange(e.value)}
          placeholder="Select a style"
        />
        <label htmlFor="style">Text style</label>
      </FloatLabel>
    </div>
  );
}
