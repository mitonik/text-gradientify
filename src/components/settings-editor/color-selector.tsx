import chroma from "chroma-js";
import { Button } from "primereact/button";
import { ColorPicker } from "primereact/colorpicker";
import { InputText } from "primereact/inputtext";
import { useId } from "react";

interface ColorSelectorProps {
  color: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  showRemove: boolean;
}

export const ColorSelector = (props: ColorSelectorProps) => {
  const { color, onChange, showRemove, onRemove } = props;
  const id = useId();
  return (
    <div className="flex place-items-center gap-3">
      <ColorPicker
        value={chroma.valid(color) ? chroma(color).hex() : "000000"}
        onChange={(e) => onChange(`${e.value}`)}
      />
      <InputText
        style={{ width: "100%" }}
        id={id}
        value={color}
        onChange={(e) => onChange(e.target.value)}
      />
      {showRemove && (
        <Button
          text
          tooltip="Remove color"
          onClick={onRemove}
          icon={<span className="material-symbols-outlined">close</span>}
        />
      )}
    </div>
  );
};
