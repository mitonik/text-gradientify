import { Settings } from "../settings-editor";
import { PresetItem } from "./preset-item";

export interface Preset {
  name: string;
  settings: Settings;
}

interface PresetsProps {
  onPresetSelect: (preset: Settings) => void;
  presets: Preset[];
  onPresetDelete: (name: string) => void;
}

export function Presets(props: PresetsProps) {
  const { onPresetSelect, presets, onPresetDelete } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {presets.map((preset, index) => (
        <PresetItem
          onPresetSelect={(preset) => onPresetSelect(preset.settings)}
          onPresetDelete={(name) => onPresetDelete(name)}
          key={index}
          preset={preset}
        />
      ))}
    </div>
  );
}
