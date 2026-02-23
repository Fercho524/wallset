import React from "react";
import ThemeToggle from "./ThemeToggle";
import Icon from "./Icon";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import PaletteSelector from "./PaletteChanger";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen overflow-hidden overflow-y-hidden flex bg-[var(--background)] text-[var(--text)] transition-colors">

      <aside className="w-80 p-5 border-r border-[rgba(0,0,0,0.06)] bg-[var(--surface)] transition-colors flex flex-col gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Icon name="DashboardSpeed" size={22} />
          {t("dashboard")}

        </h2>

        <nav className="flex flex-col gap-2">
          <button className="px-3 py-2 rounded flex items-center gap-3 bg-[var(--surface-variant)] hover:opacity-80 transition">
            <Icon name="Home" size={22} />
            {t("nav.home")}
          </button>

          <button className="px-3 py-2 rounded flex items-center gap-3 bg-[var(--surface-variant)] hover:opacity-80 transition">
            <Icon name="Folder" size={22} />
            {t("nav.files")}
          </button>

          <button className="px-3 py-2 rounded flex items-center gap-3 bg-[var(--surface-variant)] hover:opacity-80 transition">
            <Icon name="Settings" size={22} />
            {t("nav.settings")}
          </button>
        </nav>

        <div className="mt-auto pt-4 border-t border-[rgba(0,0,0,0.06)] flex flex-col gap-2">
          <LanguageSelector />

          <ThemeToggle />
        </div>


      </aside>

      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t("dashboard")}</h1>


          <div className="flex items-center gap-4">
            <PaletteSelector />
            <button className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--onPrimary)] transition flex items-center gap-2">
              <Icon name="PlusCircleSolid" size={22} />
              {t("action")}
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="p-6 rounded-xl bg-[var(--surface)] border border-[rgba(0,0,0,0.08)] shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Icon name="StarSolid" size={22} />
              {t("cards.primary.title")}
            </h3>
            <p className="opacity-80">{t("cards.primary.description")}</p>
            <button className="mt-4 px-3 py-2 rounded-lg bg-[var(--primary)] text-[var(--onPrimary)] transition flex items-center gap-2">
              <Icon name="ArrowRight" size={22} />
              {t("actions.button")}
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Icon name="BookmarkSolid" size={22} />
              {t("cards.secondary.title")}
            </h3>
            <p>{t("cards.secondary.description")}</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Icon name="BellNotificationSolid" size={22} />
              {t("cards.tertiary.title")}
            </h3>
            <p>{t("cards.tertiary.description")}</p>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Dashboard;
