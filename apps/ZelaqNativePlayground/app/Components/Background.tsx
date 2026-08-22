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

    const imageUri =
        width < 768
            ? "https://cdn.imgipsum.com/one/400/900/webp/landscapes/15"
            : "https://cdn.imgipsum.com/one/1200/800/webp/landscapes/15";

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