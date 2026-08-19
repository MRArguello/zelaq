import { createContext, useContext, useState } from "react";
import { Stack } from "expo-router";
import { ZelaqProvider } from "zelaq-ui";
import type { ThemeMode } from "zelaq-ui";

const ThemeModeContext = createContext<{ mode: ThemeMode; toggleMode: () => void }>({
  mode: "light",
  toggleMode: () => {},
});

export function useThemeModeToggle() {
  return useContext(ThemeModeContext);
}

export default function RootLayout() {
  const [mode, setMode] = useState<ThemeMode>("light");
  const toggleMode = () => setMode((current) => (current === "dark" ? "light" : "dark"));

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ZelaqProvider mode={mode}>
        <Stack />
      </ZelaqProvider>
    </ThemeModeContext.Provider>
  );
}
