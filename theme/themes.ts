export const lightTheme = {
    mode: "light",
    white: "#f1f1f1",
    text: "#111827", // from Colors.light.text (gray-900)
    background: "#F9FAFB", // from Colors.light.background (gray-50)
    tint: "#f59e0b", // assuming tintColorLight = #f59e0b
    icon: "#6B7280", // from Colors.light.icon (gray-500)
    card: "#ffffff",
    secondary: "#E5E7EB", // Colors.light.border (gray-200)
    borderColor: "#ccc", // unified with secondary
    tabIconDefault: "#9CA3AF", // Colors.light.tabIconDefault (gray-400)
    tabIconSelected: "#f59e0b", // tintColorLight
    muted: "#F3F4F6", // gray-100
    destructive: "#EF4444", // red-500

    // Note colors
    yellow: "#FFF9C4",
    blue: "#E1F5FE",
    green: "#E8F5E9",
    purple: "#F3E5F5",
    red: "#FFEBEE",
    orange: "#FFF3E0",

    // Tag colors
    tagBackground: "rgba(0, 0, 0, 0.1)",
    tagText: "#4B5563", // gray-600
};

export const darkTheme = {
    mode: "dark",
    white: "#f1f1f1",
    text: "#F9FAFB", // from Colors.dark.text (gray-50)
    background: "#111827", // from Colors.dark.background (gray-900)
    tint: "#f59e0b", // assuming tintColorDark = #f59e0b
    icon: "#9CA3AF", // from Colors.dark.icon (gray-400)
    card: "#374151", // from Colors.dark.border (gray-700)
    secondary: "#1F2937", // Colors.dark.muted (gray-800)
    borderColor: "#777", // dark border from Colors
    tabIconDefault: "#6B7280", // from Colors.dark.tabIconDefault (gray-500)
    tabIconSelected: "#f59e0b", // tintColorDark
    muted: "#1F2937", // gray-800
    destructive: "#EF4444", // red-500

    // Note colors
    yellow: "#E8AA05",
    blue: "#0277BD",
    green: "#2E7D32",
    purple: "#7B1FA2",
    red: "#C62828",
    orange: "#EF6C00",

    // Tag colors
    tagBackground: "rgba(255, 255, 255, 0.2)",
    tagText: "#E5E7EB", // gray-200
};

export type ThemeType = typeof lightTheme;
