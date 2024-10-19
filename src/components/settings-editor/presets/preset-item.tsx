import { Card } from "primereact/card";
import { ColorPicker } from "primereact/colorpicker";
import { Button } from "primereact/button";
import { Preset } from "./presets";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { STYLES } from "../styles";

const THREE_SECONDS = 1000 * 3;

interface PresetItemProps {
  preset: Preset;
  onPresetSelect: (preset: Preset) => void;
  onPresetDelete: (name: string) => void;
}

export function PresetItem(props: PresetItemProps) {
  const { onPresetSelect, preset, onPresetDelete } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const accept = () => {
    onPresetDelete(preset.name);
  };

  const copyColor = async (color: string) => {
    await navigator.clipboard.writeText(color);
    toast.current?.show({
      severity: "info",
      summary: "Copied",
      detail: "Copied color to clipboard.",
      life: THREE_SECONDS,
    });
  };

  const footer = (
    <div className="flex gap-1">
      <Button
        className="flex-1"
        label="Use"
        onClick={() => onPresetSelect(preset)}
      />
      <Button
        className="flex-1"
        outlined
        label="Delete"
        onClick={() => setVisible(true)}
        severity="danger"
      />
    </div>
  );

  const styleLabel = STYLES.find(
    (styleOption) => styleOption.value === preset.settings.style,
  );

  return (
    <Card title={preset.name} footer={footer}>
      <Toast ref={toast} />
      <ConfirmDialog
        dismissableMask
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to delete preset?"
        header="Confirmation"
        accept={accept}
      />
      <div className="flex flex-col gap-3">
        <div className="flex">
          <span>{preset.settings.mode}</span>
          <span className="px-2">|</span>
          <span>{styleLabel?.label}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {preset.settings.colors.map((color, index) => (
            <ColorPicker
              key={index}
              onClick={() => copyColor(color)}
              tooltip={`Copy "${color}"`}
              value={color}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
