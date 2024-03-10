import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const checkedDark = (): boolean =>
  typeof window != 'undefined' &&  window.matchMedia('(prefers-color-scheme:dark)').matches;

export const addDarkTailwind = () =>
    document.documentElement.classList.add('dark');

export const removeDarkTailwind = () =>
    document.documentElement.classList.remove('dark');

/** Activar o desactivar el modo oscuro
 * @param e Evento del checkbox del theme controller de daisyUI
 * @param setThemeDark Funcion set para el cambio de estado del tema
 */
export const changeThemeDark = (
    e: ChangeEvent<HTMLInputElement>,
    setThemeDark: Dispatch<SetStateAction<boolean>>,
) => {
    const { value } = e.target;

    if (value == 'ganadexTheme') {
        setThemeDark(true);
        addDarkTailwind();
    } else if (value == 'ganadexThemeDark') {
        setThemeDark(false);
        removeDarkTailwind();
    }
};
