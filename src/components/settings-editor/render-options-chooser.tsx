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

export const STYLES: StyleOption[] = [
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
  {
    label: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯",
    value: "fraktur",
  },
  {
    label: "𝕱𝖗𝖆𝖐𝖙𝖚𝖗 𝕭𝖔𝖑𝖉",
    value: "bold-fraktur",
  },
  {
    label: "𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎",
    value: "monospace",
  },
  {
    label: "𝔻𝕠𝕦𝕓𝕝𝕖-𝕤𝕥𝕣𝕦𝕔𝕜",
    value: "double-struck",
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
