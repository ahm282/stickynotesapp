export const lightTheme = {
    mode: "light",
    white: "#f1f1f1",
    text: "#111827",
    background: "#F9FAFB",
    tint: "#f59e0b",
    icon: "#6B7280",
    card: "#ffffff",
    secondary: "#E5E7EB",
    borderColor: "#ccc",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: "#f59e0b",
    muted: "#F3F4F6",
    destructive: "#EF4444",
    disabled: "#D1D5DB",

    // Note colors
    yellow: "#FFF9C4",
    blue: "#E1F5FE",
    green: "#E8F5E9",
    purple: "#F3E5F5",
    red: "#FFEBEE",
    orange: "#FFF3E0",

    // Tag colors
    tagBackground: "rgba(0, 0, 0, 0.1)",
    tagText: "#4B5563",
};

export const darkTheme = {
    mode: "dark",
    white: "#f1f1f1",
    text: "#F9FAFB",
    background: "#111827",
    tint: "#f59e0b",
    icon: "#9CA3AF",
    card: "#374151",
    secondary: "#1F2937",
    borderColor: "#777",
    tabIconDefault: "#6B7280",
    tabIconSelected: "#f59e0b",
    muted: "#1F2937",
    destructive: "#EF4444",
    disabled: "#4B5563",

    // Note colors
    yellow: "#E19E09",
    blue: "#0277BD",
    green: "#2E7D32",
    purple: "#7B1FA2",
    red: "#C62828",
    orange: "#EF6C00",

    // Tag colors
    tagBackground: "rgba(255, 255, 255, 0.2)",
    tagText: "#E5E7EB",
};

export type ThemeType = typeof lightTheme;
