import * as Icons from "iconoir-react";

export type IconName = keyof typeof Icons;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export default function Icon({ name, size = 22, color = "currentColor", className }: IconProps) {
  const Component = Icons[name];

  if (!Component) {
    console.warn(`Icon "${name}" no existe en iconoir-react.`);
    return null;
  }

  return (
    <>
      <Component width={size} height={size} color={color} value={<></>} className={className} children={undefined} />
    </>
  )
}
