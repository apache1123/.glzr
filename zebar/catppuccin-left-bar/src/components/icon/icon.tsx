export interface IconProps {
  iconClass: string;
}

export function Icon({ iconClass }: IconProps) {
  return <i className={`nf ${iconClass}`}></i>;
}
