import { Icon } from "../icon/icon";

const iconsByProcessName = {
  msedge: "nf-md-microsoft_edge",
  Discord: "nf-fa-discord",
  Code: "nf-md-microsoft_visual_studio_code",
  Spotify: "nf-fa-spotify",
  steamwebhelper: "nf-md-steam",
  OneCommander: "nf-oct-file_directory",
  stremio: "nf-md-movie",
  mpvnet: "nf-linux-mpv",
  QRSL: "nf-md-gamepad_variant",
  webstorm64: "nf-fa-code",
  anki: "nf-md-card_text",
};

export interface ApplicationIconProps {
  processName: string | undefined;
}

export function ApplicationIcon({ processName }: ApplicationIconProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const iconClass = iconsByProcessName[processName] ?? "nf-md-application"; // Generic icon for unknown process name

  return <Icon iconClass={iconClass} />;
}
