import { useState } from "react";
import { Output } from "./components/output/output";
import {
  Settings,
  SettingsEditor,
} from "./components/settings-editor/settings-editor";
import { Input } from "./components/input";
import { Title } from "./components/title";
import { Toolbar } from "primereact/toolbar";

const INITIAL_SETTINGS: Settings = {
  style: "normal",
  mode: "rgb",
  colors: ["ff2424", "328a32", "008ae5"],
};

const INITIAL_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export function App() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [text, setText] = useState(INITIAL_TEXT);

  const handleSettingsChange = (settings: Settings) => {
    setSettings(settings);
  };

  const handleTextChange = (text: string) => {
    setText(text);
  };

  return (
    <main className="mx-auto flex max-w-screen-sm flex-col xl:max-w-screen-xl xl:gap-16">
      <Toolbar start={<Title />} />
      <div className="grid grid-cols-1 gap-8 p-4 xl:grid-cols-3 xl:flex-row xl:gap-16">
        <div className="col-span-1">
          <SettingsEditor
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-8 xl:col-span-2">
          <Input onChange={handleTextChange} text={text} />
          <Output settings={settings} text={text} />
        </div>
      </div>
    </main>
  );
}
