import { Card } from "primereact/card";
import { ColorPicker } from "primereact/colorpicker";
import { Button } from "primereact/button";
import { Preset } from "./presets";
import { Style } from "../settings-editor";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

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
            <ColorPicker value={color} key={index} />
          ))}
        </div>
      </div>
    </Card>
  );
}
