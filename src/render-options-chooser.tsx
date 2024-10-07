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
const STYLES = [
  "Normal",
  "𝐼𝑡𝑎𝑙𝑖𝑐",
  "𝐁𝐨𝐥𝐝",
  "𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄",
  "𝒮𝒸𝓇𝒾𝓅𝓉",
  "𝓢𝓬𝓻𝓲𝓹𝓽 𝓑𝓸𝓵𝓭",
];

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
