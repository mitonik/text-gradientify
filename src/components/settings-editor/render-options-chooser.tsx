import { InterpolationMode } from "chroma-js";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { Style } from "./settings-editor";

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

interface StyleOption {
  label: string;
  value: Style;
}

const STYLES: StyleOption[] = [
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "𝐁𝐨𝐥𝐝",
    value: "bold",
  },
  {
    label: "𝐼𝑡𝑎𝑙𝑖𝑐",
    value: "italic",
  },
  {
    label: "𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄",
    value: "bold-italic",
  },
  {
    label: "𝒮𝒸𝓇𝒾𝓅𝓉",
    value: "script",
  },
  {
    label: "𝓢𝓬𝓻𝓲𝓹𝓽 𝓑𝓸𝓵𝓭",
    value: "script-bold",
  },
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
