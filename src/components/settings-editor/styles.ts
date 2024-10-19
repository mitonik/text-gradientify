import { Style } from "./settings-editor";

interface StyleOption {
  label: string;
  value: Style;
}

export const STYLES: StyleOption[] = [
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
  {
    label: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯",
    value: "fraktur",
  },
  {
    label: "𝕱𝖗𝖆𝖐𝖙𝖚𝖗 𝕭𝖔𝖑𝖉",
    value: "bold-fraktur",
  },
  {
    label: "𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎",
    value: "monospace",
  },
  {
    label: "𝔻𝕠𝕦𝕓𝕝𝕖-𝕤𝕥𝕣𝕦𝕔𝕜",
    value: "double-struck",
  },
];
