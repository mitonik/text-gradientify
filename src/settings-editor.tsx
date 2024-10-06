import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { RenderOptionsChooser } from "./render-options-chooser";
import { ColorSelector } from "./color-selector";
import chroma, { InterpolationMode } from "chroma-js";
import { Divider } from "primereact/divider";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Preset, Presets } from "./presets/presets";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { useLocalStorage } from "primereact/hooks";

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

const AUTUMN_PRESET: Preset = {
  name: "Autumn",
  settings: {
    style: "𝑀𝑎𝑡ℎ𝑒𝑚𝑎𝑡𝑖𝑐𝑎𝑙 𝐼𝑡𝑎𝑙𝑖𝑐",
    mode: "oklch",
    colors: ["ff9524", "c9663e", "a80f1c"],
  },
};

const INITIAL_PRESETS = [AUTUMN_PRESET];

export function SettingsEditor(props: SettingsEditorProps) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [presets, setPresets] = useLocalStorage(INITIAL_PRESETS, "presets");
  const [newPresetName, setNewPresetName] = useState("");
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
          <ConfirmDialog
            visible={dialogVisible}
            onHide={() => setDialogVisible(false)}
            message={
              <InputText
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
              />
            }
            header={"name preset"}
            defaultFocus="accept"
            acceptLabel="Save"
            rejectLabel="Cancel"
            accept={() => {
              setNewPresetName("");
              setPresets([...presets, { name: newPresetName, settings }]);
            }}
          />
          <div>
            <Button label="Show presets" onClick={() => setVisible(true)} />
            <Button
              outlined
              label="Save as preset"
              onClick={() => setDialogVisible(true)}
            />
          </div>
          <Sidebar
            visible={visible}
            onHide={() => setVisible(false)}
            position="right"
          >
            <Presets
              presets={presets}
              onPresetDelete={(name) =>
                setPresets((previousPresets) =>
                  previousPresets.filter((preset) => preset.name !== name)
                )
              }
              onPresetSelect={(settings) => {
                onSettingsChange(settings);
                setVisible(false);
              }}
            />
          </Sidebar>
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
