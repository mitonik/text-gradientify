import chroma from "chroma-js";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { GradientMode, Style } from "./settings-editor";
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

const GRADIENT_MODES: GradientMode[] = ["entire-text", "per-line"];

interface RenderOptionsChooserProps {
  gradientMode: GradientMode;
  mode: chroma.InterpolationMode;
  onGradientModeChange: (gradientMode: GradientMode) => void;
  onModeChange: (mode: chroma.InterpolationMode) => void;
  onStyleChange: (style: Style) => void;
  style: Style;
}

export function RenderOptionsChooser(props: RenderOptionsChooserProps) {
  const {
    gradientMode,
    mode,
    onGradientModeChange,
    onModeChange,
    onStyleChange,
    style,
  } = props;
  return (
    <div className="flex flex-col gap-3">
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
      <FloatLabel style={{ width: "100%" }}>
        <Dropdown
          style={{ width: "100%" }}
          id="gradientMode"
          options={GRADIENT_MODES}
          value={gradientMode}
          onChange={(e) => onGradientModeChange(e.value)}
          placeholder="Select a gradient mode"
        />
        <label htmlFor="gradientMode">Gradient mode</label>
      </FloatLabel>
    </div>
  );
}
