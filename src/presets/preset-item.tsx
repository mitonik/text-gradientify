import { Card } from "primereact/card";
import { ColorPicker } from "primereact/colorpicker";
import { Button } from "primereact/button";
import { Preset } from "./presets";

interface PresetItemProps {
  preset: Preset;
  onPresetSelect: (preset: Preset) => void;
  onPresetDelete: (name: string) => void;
}

export function PresetItem(props: PresetItemProps) {
  const { onPresetSelect, preset, onPresetDelete } = props;

  const footer = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button label="Use" onClick={() => onPresetSelect(preset)} />
      <Button
        severity="danger"
        outlined
        label="Delete"
        onClick={() => onPresetDelete(preset.name)}
      />
    </div>
  );
  return (
    <Card title={preset.name} footer={footer}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          {preset.settings.colors.map((color, index) => (
            <ColorPicker value={color} key={index} />
          ))}
        </div>
        <span>
          {preset.settings.mode}, {preset.settings.style}
        </span>
      </div>
    </Card>
  );
}
