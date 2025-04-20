import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

export function HapticTab(props: BottomTabBarButtonProps) {
    return (
        <PlatformPressable
            pressColor={"transparent"}
            android_ripple={null}
            {...props}
            onPressIn={(ev) => {
                if (process.env.EXPO_OS === "ios") {
                    // Add a soft haptic feedback when pressing down on the tabs.
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                } else if (Platform.OS === "android") {
                    // Add a soft haptic feedback when pressing down on the tabs.
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }

                props.onPressIn?.(ev);
            }}
        />
    );
}
