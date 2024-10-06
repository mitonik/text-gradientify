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
    <div style={{ display: "flex", gap: "0.5rem", placeItems: "center" }}>
      <ColorPicker value={color} onChange={(e) => onChange(`${e.value}`)} />
      <InputText
        id={id}
        value={color}
        onChange={(e) => onChange(e.target.value)}
      />
      {showRemove && (
        <Button
          outlined
          onClick={onRemove}
          icon={<span className="material-symbols-outlined">close</span>}
        />
      )}
    </div>
  );
};
