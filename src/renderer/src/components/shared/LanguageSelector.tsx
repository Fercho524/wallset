import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
    const { i18n } = useTranslation();

    return (
        <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="px-2 py-1 rounded bg-[var(--surface)]"
        >
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    );
}