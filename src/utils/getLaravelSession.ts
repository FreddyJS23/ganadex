export const getLaravelSession = (headers: Headers) => {
    const setCookieHeader = headers.get("set-cookie")
    const cookies = setCookieHeader?.split(", ")

    let laravel_session = null

    for (const cookie of cookies!) {
        if (cookie.startsWith("laravel_session=")) {
            /*    el token siempre termina con %3D, lo cual si se envia con esa terminacion sera invalido
                por eso se parsea para obtener lo que este antes del %   */
            laravel_session = cookie.split("=")[1].split("%")[0]
        }

        if (laravel_session) break
    }
    return laravel_session as string
};



