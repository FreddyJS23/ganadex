import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const checkedDark = (): boolean =>
  typeof window != "undefined" &&
  window.matchMedia("(prefers-color-scheme:dark)").matches;

export const addDarkMode = () => {
  document.documentElement.classList.add("dark");
  document.documentElement.setAttribute("data-theme", "ganadexThemeDark");
};

export const removeDarkMode = () => {
  document.documentElement.classList.remove("dark");
  document.documentElement.setAttribute("data-theme", "ganadexTheme");
};

/** Activar o desactivar el modo oscuro
 * @param e Evento del checkbox del theme controller de daisyUI
 * @param setThemeDark Funcion set para el cambio de estado del tema
 */
export const changeThemeDark = (
  e: ChangeEvent<HTMLInputElement>,
  setThemeDark: Dispatch<SetStateAction<boolean>>,
) => {
  const { value } = e.target;

  if (value == "ganadexTheme") {
    setThemeDark(true);
    addDarkMode();
    localStorage.setItem("darkMode", "true");
  } else if (value == "ganadexThemeDark") {
    setThemeDark(false);
    removeDarkMode();
    localStorage.setItem("darkMode", "false");
  }
  window.location.reload();
};
