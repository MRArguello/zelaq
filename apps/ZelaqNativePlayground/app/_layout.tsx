import { createContext, useContext, useState, useEffect } from "react";
import { Stack } from "expo-router";
import { ZelaqProvider } from "zelaq-ui";
import type { ThemeMode, ReduceMotionMode } from "zelaq-ui";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const ThemeModeContext = createContext<{
  mode: ThemeMode
  toggleMode: () => void
  reduceMotion: ReduceMotionMode
  toggleReduceMotion: () => void
}>({
  mode: "light",
  toggleMode: () => { },
  reduceMotion: "system",
  toggleReduceMotion: () => { },
});

export function useThemeModeToggle() {
  return useContext(ThemeModeContext);
}

export default function RootLayout() {
  const [mode, setMode] = useState<ThemeMode>("light");
  const toggleMode = () => setMode((current) => (current === "dark" ? "light" : "dark"));
  // Cycles system -> always (reduced) -> never (full motion) -> system.
  const [reduceMotion, setReduceMotion] = useState<ReduceMotionMode>("system");
  const toggleReduceMotion = () =>
    setReduceMotion((current) => (current === "system" ? "always" : current === "always" ? "never" : "system"))
  const [fontsLoaded] = useFonts({
    Satoshi: require('../assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('../assets/fonts/Satoshi-Medium.otf'),
    'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode, reduceMotion, toggleReduceMotion }}>
      <ZelaqProvider
        mode={mode}
        reduceMotion={reduceMotion}
        theme={{
          typography: {
            button: { fontFamily: 'Satoshi-Medium' },
            subheading: { fontFamily: 'Satoshi-Bold' },
            heading1: { fontFamily: 'Satoshi-Bold' },
            heading2: { fontFamily: 'Satoshi-Bold' },
            heading3: { fontFamily: 'Satoshi-Bold' },
            heading4: { fontFamily: 'Satoshi-Bold' },
            hero1: { fontFamily: 'Satoshi-Bold' },
            hero2: { fontFamily: 'Satoshi-Bold' },
            hero3: { fontFamily: 'Satoshi-Bold' },
            hero4: { fontFamily: 'Satoshi-Bold' },
          },
        }}
      >
        <Stack />
      </ZelaqProvider>
    </ThemeModeContext.Provider>
  );
}
