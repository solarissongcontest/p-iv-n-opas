export const LIGHT_THEME_COLOR = "#f7f7f7";
export const DARK_THEME_COLOR = "#0f1012";

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
