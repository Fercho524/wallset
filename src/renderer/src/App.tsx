import Dashboard from "./components/Dashboard";
import { PaletteProvider } from "./theme/PaletteProvider";
import WallpaperList from "./pages/WallpaperList";


function App() {
  return (
    <PaletteProvider>
      <WallpaperList/>
    </PaletteProvider>

  );
}

export default App;
