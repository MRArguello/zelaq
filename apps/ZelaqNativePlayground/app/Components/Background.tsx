import type { ReactNode } from "react";
import {
    ImageBackground,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { Theme } from "zelaq-ui";

export default function PlaygroundBackground({
    children,
    theme,
}: {
    children: ReactNode;
    theme: Theme;
}) {
    const { width, height } = useWindowDimensions();
    const imageUri =
        width < 768
            ? "https://picsum.photos/id/190/400/900"
            : "https://picsum.photos/id/190/1200/800";

    return (
        <ImageBackground
            source={{ uri: imageUri }}
            resizeMode="cover"
            style={[
                styles.container,
                { minHeight: height, backgroundColor: theme.colors.backdrop },
            ]}
            imageStyle={styles.image}
        >
            <LinearGradient
                pointerEvents="none"
                colors={[theme.colors.backdrop, 'transparent', 'transparent', theme.colors.backdrop]}
                locations={[0, 0.3, 0.7, 1]}
                style={StyleSheet.absoluteFillObject}
            />

            {children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
    },

    image: {
        opacity: 0.55,
    },
});