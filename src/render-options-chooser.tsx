import { InterpolationMode } from "chroma-js";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";

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
const STYLES = ["Normal", "𝑀𝑎𝑡ℎ𝑒𝑚𝑎𝑡𝑖𝑐𝑎𝑙 𝐼𝑡𝑎𝑙𝑖𝑐"];

interface RenderOptionsChooserProps {
  onModeChange: (mode: InterpolationMode) => void;
  onStyleChange: (style: string) => void;
  mode: InterpolationMode;
  style: string;
}

export function RenderOptionsChooser(props: RenderOptionsChooserProps) {
  const { mode, onModeChange, onStyleChange, style } = props;
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <FloatLabel>
        <Dropdown
          id="mode"
          value={mode}
          onChange={(e) => onModeChange(e.value)}
          options={MODES}
          optionLabel="name"
          placeholder="Select a mode"
        />
        <label htmlFor="mode">Mix mode</label>
      </FloatLabel>
      <FloatLabel>
        <Dropdown
          id="style"
          options={STYLES}
          value={style}
          onChange={(e) => onStyleChange(e.value)}
          optionLabel="name"
          placeholder="Select a style"
        />
        <label htmlFor="style">Style</label>
      </FloatLabel>
    </div>
  );
}
