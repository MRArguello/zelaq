import type { ReactNode } from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import type { Theme } from "zelaq-ui";

export default function PlaygroundBackground({
    children,
    theme,
}: {
    children: ReactNode;
    theme: Theme;
}) {
    const { width } = useWindowDimensions();

    // cdn.imgipsum.com never resolves — confirmed dead, not just blocked from one environment.
    // ImageBackground silently falls back to its plain backgroundColor when the source fails,
    // which is what "just a plain color" on mobile actually was.
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
                { backgroundColor: theme.colors.backdrop },
            ]}
            imageStyle={styles.image}
        >
            <View
                pointerEvents="none"
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        backgroundColor: theme.colors.backdrop,
                        opacity: 0.68,
                    },
                ]}
            />

            {children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
    },

    image: {
        opacity: 0.55,
    },
});