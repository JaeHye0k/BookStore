export type ThemeName = "light" | "dark";
type ColorKey = "primary" | "background" | "secondary" | "third";

interface Theme {
    name: ThemeName;
    color: Record<ColorKey, string>;
}

export const light: Theme = {
    name: "light",
    color: {
        primary: "brown",
        background: "lightgray",
        secondary: "lightgray",
        third: "lightgray",
    },
};

export const dark: Theme = {
    name: "dark",
    color: {
        primary: "coral",
        background: "midnightblue",
        secondary: "lightgray",
        third: "lightgray",
    },
};

export const getTheme = (themeName: ThemeName): Theme => {
    switch (themeName) {
        case "light":
            return light;
        case "dark":
            return dark;
    }
};
