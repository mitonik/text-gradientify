import { Button } from "primereact/button";
import { RenderOptionsChooser } from "./render-options-chooser";
import { ColorSelector } from "./color-selector";
import chroma from "chroma-js";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Preset, Presets } from "./presets/presets";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { useLocalStorage } from "primereact/hooks";

export type Style =
  | "normal"
  | "italic"
  | "script"
  | "script-bold"
  | "bold"
  | "bold-italic"
  | "fraktur"
  | "bold-fraktur"
  | "monospace"
  | "double-struck";

export type GradientMode = "entire-text" | "per-line";

export interface Settings {
  colors: string[];
  gradientMode: GradientMode;
  mode: chroma.InterpolationMode;
  style: Style;
}

const MINIMUM_COLOR_COUNT = 1;
const DEFAULT_NEW_COLOR = "000000";

interface SettingsEditorProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

const AUTUMN_PRESET: Preset = {
  name: "Autumn",
  settings: {
    colors: ["ff9524", "c9663e", "a80f1c"],
    gradientMode: "entire-text",
    mode: "oklch",
    style: "italic",
  },
};

const INITIAL_PRESETS = [AUTUMN_PRESET];

export function SettingsEditor(props: SettingsEditorProps) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [presets, setPresets] = useLocalStorage(INITIAL_PRESETS, "presets");
  const [newPresetName, setNewPresetName] = useState("");
  const { onSettingsChange, settings } = props;
  const { colors, gradientMode, mode, style } = settings;

  const mappedColors = colors.map((color, index) => {
    const handleColorChange = (value: string) => {
      const newColors = [...colors];
      newColors[index] = value;
      onSettingsChange({
        ...settings,
        colors: newColors,
      });
    };

    return (
      <ColorSelector
        key={index}
        color={color}
        onRemove={() => {
          const newColors = [...colors];
          const filteredColors = newColors.filter(
            (_color, colorIndex) => colorIndex !== index,
          );
          onSettingsChange({
            ...settings,
            colors: filteredColors,
          });
        }}
        showRemove={colors.length > MINIMUM_COLOR_COUNT}
        showMoveUp={index !== 0}
        onMoveUp={() => {
          const firstColorIndex = index;
          const secondColorIndex = index - 1;
          const firstColor = colors[firstColorIndex];
          const secondColor = colors[secondColorIndex];
          const colorsBefore = colors.slice(0, index - 1);
          const colorsAfter = colors.slice(index + 1);
          const newColors = [
            ...colorsBefore,
            firstColor,
            secondColor,
            ...colorsAfter,
          ];
          onSettingsChange({
            ...settings,
            colors: newColors,
          });
        }}
        onChange={handleColorChange}
      />
    );
  });

  return (
    <div>
      <ConfirmDialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        message={
          <InputText
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
          />
        }
        header="Name preset"
        defaultFocus="accept"
        acceptLabel="Save"
        rejectLabel="Cancel"
        accept={() => {
          setNewPresetName("");
          setPresets([...presets, { name: newPresetName, settings }]);
        }}
        reject={() => setNewPresetName("")}
      />
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <Presets
          presets={presets}
          onPresetDelete={(name) =>
            setPresets((previousPresets) =>
              previousPresets.filter((preset) => preset.name !== name),
            )
          }
          onPresetSelect={(preset) => {
            onSettingsChange(preset.settings);
            setVisible(false);
          }}
        />
      </Sidebar>
      <div className="flex flex-col gap-8">
        <RenderOptionsChooser
          gradientMode={gradientMode}
          mode={mode}
          onGradientModeChange={(gradientMode) =>
            onSettingsChange({ ...settings, gradientMode })
          }
          onModeChange={(mode) => onSettingsChange({ ...settings, mode })}
          onStyleChange={(style) => onSettingsChange({ ...settings, style })}
          style={style}
        />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">{mappedColors}</div>
          <Button
            outlined
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
        <div className="flex gap-1">
          <Button
            style={{ width: "100%" }}
            label="Show presets"
            onClick={() => setVisible(true)}
          />
          <Button
            style={{ width: "100%" }}
            outlined
            label="Save as preset"
            onClick={() => setDialogVisible(true)}
          />
        </div>
      </div>
    </div>
  );
}
