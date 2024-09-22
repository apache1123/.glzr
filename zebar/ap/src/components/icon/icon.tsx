export interface IconProps {
  iconClass: string;
}

export function Icon(props: IconProps) {
  return <i class={`nf ${props.iconClass}`}></i>;
}
