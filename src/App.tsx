import { useState } from "react";
import { Output } from "./output";
import { Settings, SettingsEditor } from "./settings-editor";
import { Input } from "./input";
import chroma from "chroma-js";
import { Title } from "./title";

const INITIAL_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const DEFAULT_SETTINGS: Settings = {
  style: "Normal",
  mode: "rgb",
  colors: ["ff2424", "328a32", "008ae5"],
};

export function App() {
  const [text, setText] = useState(INITIAL_TEXT);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const { colors, mode, style } = settings;

  const colorRange = chroma
    .scale(colors)
    .mode(mode)
    .colors([...text].length);

  return (
    <div
      style={{
        maxWidth: "768px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Title />
      <SettingsEditor
        settings={settings}
        onSettingsChange={(settings) => setSettings(settings)}
      />
      <Input text={text} onChange={(e) => setText(e.target.value)} />
      <Output style={style} colorRange={colorRange} text={text} />
    </div>
  );
}
