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
    <div className="flex gap-1">
      <Button label="Use" onClick={() => onPresetSelect(preset)} />
      <Button
        label="Delete"
        onClick={() => onPresetDelete(preset.name)}
        severity="danger"
      />
    </div>
  );

  return (
    <Card title={preset.name} footer={footer}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-1">
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
