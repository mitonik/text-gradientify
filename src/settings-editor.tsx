import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { RenderOptionsChooser } from "./render-options-chooser";
import { ColorSelector } from "./color-selector";
import chroma, { InterpolationMode } from "chroma-js";
import { Divider } from "primereact/divider";

export interface Settings {
  style: string;
  mode: InterpolationMode;
  colors: string[];
}

const DEFAULT_NEW_COLOR = "000000";

interface SettingsEditorProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export function SettingsEditor(props: SettingsEditorProps) {
  const { onSettingsChange, settings } = props;
  const { colors, mode, style } = settings;
  const mappedColors = colors.map((color, index) => {
    return (
      <ColorSelector
        key={index}
        color={color}
        onRemove={() => {
          const newColors = [...colors];
          const filteredColors = newColors.filter(
            (_color, colorIndex) => colorIndex !== index
          );
          const validColors = filteredColors.filter((color) => {
            if (!chroma.valid(color)) {
              return;
            }
            return color;
          });
          onSettingsChange({
            ...settings,
            colors: validColors,
          });
        }}
        showRemove={colors.length > 1}
        onChange={(value) => {
          const newColors = [...colors];
          newColors[index] = value;
          const validColors = newColors.filter((color) => {
            if (!chroma.valid(color)) {
              return;
            }
            return color;
          });
          onSettingsChange({
            ...settings,
            colors: validColors,
          });
        }}
      />
    );
  });

  return (
    <Accordion activeIndex={0}>
      <AccordionTab header="Settings">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {mappedColors}
          <div style={{ display: "flex", placeItems: "center" }}>
            <Button
              label="Add color"
              icon={<span className="material-symbols-outlined">add</span>}
              onClick={() =>
                onSettingsChange({
                  ...settings,
                  colors: [...colors, DEFAULT_NEW_COLOR],
                })
              }
            />
          </div>
          <Divider />
          <RenderOptionsChooser
            mode={mode}
            onModeChange={(mode) => onSettingsChange({ ...settings, mode })}
            onStyleChange={(style) => onSettingsChange({ ...settings, style })}
            style={style}
          />
        </div>
      </AccordionTab>
    </Accordion>
  );
}
