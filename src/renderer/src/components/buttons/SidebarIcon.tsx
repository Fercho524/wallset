import Icon, { IconProps } from "@renderer/components/shared/Icon";
import { useTranslation } from "react-i18next";

interface Props extends IconProps {

}

export default function SidebarIcon({ name, size }: Props) {
    const { t } = useTranslation()

    return (
        <button className="px-3 py-2 hover:bg-[var(--primary)] hover:cursor-pointer rounded flex items-center gap-3 bg-[var(--surface-variant)] hover:opacity-80 transition">
            <Icon name={name} size={size} />
        </button>
    )
}