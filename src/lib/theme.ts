export const LIGHT_THEME_COLOR = "#f5f4f0";
export const DARK_THEME_COLOR = "#111310";

export function applyTheme(dark: boolean) {
  if (typeof document === "undefined") return;

  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  document.documentElement.style.backgroundColor = dark
    ? DARK_THEME_COLOR
    : LIGHT_THEME_COLOR;

  if (document.body) {
    document.body.style.backgroundColor = dark
      ? DARK_THEME_COLOR
      : LIGHT_THEME_COLOR;
  }

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) {
    meta.content = dark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
  }
}

export function storedThemeIsDark() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("opk.theme") === "dark";
}
