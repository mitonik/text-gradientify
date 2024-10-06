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
    <>
      <Button label="Use" onClick={() => onPresetSelect(preset)} />
      <Button label="Delete" onClick={() => onPresetDelete(preset.name)} />
    </>
  );
  return (
    <Card title={preset.name} footer={footer}>
      {preset.settings.colors.map((color, index) => (
        <ColorPicker value={color} key={index} />
      ))}
      <p>{preset.settings.mode}</p>
      <p>{preset.settings.style}</p>
    </Card>
  );
}
