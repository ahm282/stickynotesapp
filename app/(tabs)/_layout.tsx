import React from "react";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Archive, House, Tag } from "lucide-react-native";
import { useTheme } from "@/theme/themeProvider";

export default function TabLayout() {
    const theme = useTheme();

    const tabBarItemStyle = {
        borderTopColor: theme.borderColor,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        flexDirection: "row" as const,
    };

    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: theme.background,
                },
                tabBarItemStyle,
                tabBarActiveTintColor: theme.tint,
                tabBarInactiveTintColor: theme.icon,
                tabBarLabel: ({ focused, color }) => (
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: "Poppins_400Regular",
                            paddingBottom: 2,
                            color,
                            borderBottomWidth: 1,
                            borderBottomColor: focused ? theme.tint : "transparent",
                        }}>
                        {(() => {
                            switch (route.name) {
                                case "index":
                                    return "Home";
                                case "Archive":
                                    return "Archive";
                                case "Tags":
                                    return "Tags";
                                default:
                                    return route.name;
                            }
                        })()}
                    </Text>
                ),
            })}>
            <Tabs.Screen
                name='index'
                options={{
                    title: "Home",
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <House
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='Archive'
                options={{
                    title: "Archive",
                    tabBarIcon: ({ color }) => (
                        <Archive
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='Tags'
                options={{
                    title: "Tags",
                    tabBarIcon: ({ color }) => (
                        <Tag
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
