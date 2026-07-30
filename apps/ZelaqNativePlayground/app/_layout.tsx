import { Stack } from "expo-router";
import { UIProvider } from "@zelaq/ui";

export default function RootLayout() {
  return (
    <UIProvider theme={{ colors: { primary: "#7c3aed" } }}>
      <Stack />
    </UIProvider>
  );
}
