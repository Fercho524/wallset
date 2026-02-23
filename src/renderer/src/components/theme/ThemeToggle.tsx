
import { usePaletteContext } from "@renderer/theme/PaletteProvider";
import Icon from "../shared/Icon";


export function ThemeToggle() {
  const { variant, toggleVariant } = usePaletteContext();
  const isDark = variant === "dark";

  return (
    <button
      onClick={toggleVariant}
      aria-label="Toggle theme"
      className={`
        relative w-14 h-8 flex items-center 
        rounded-full cursor-pointer transition-all 
        border border-[var(--outline)]
        bg-[var(--primary)]
        shadow-inner
      `}
      style={{
        transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
      }}
    >
      {/* Icono sol */}
      <span
        className={`
          absolute left-1 transition-opacity duration-300
          ${isDark ? "opacity-0" : "opacity-100"}
        `}
      >
        <Icon name="SunLight" size={16} />
      </span>

      {/* Icono luna */}
      <span
        className={`
          absolute right-1 transition-opacity duration-300
          ${isDark ? "opacity-100" : "opacity-0"}
        `}
      >
        <Icon name="HalfMoon" size={16} />
      </span>

      {/* Thumb estilo iOS */}
      <span
        className={`
          absolute w-7 h-7
          rounded-full
          bg-[var(--surface)]
          shadow-md
          transform transition-transform duration-300
          ${isDark ? "translate-x-6" : "translate-x-1"}
        `}
        style={{
          transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
      />
    </button>
  );
}

export default ThemeToggle;