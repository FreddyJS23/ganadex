export const getNewCookiesSession = (headers: Headers) => {
    
    const setCookieHeader =headers.get("set-cookie")
    const cookies = setCookieHeader?.split(", ")

    let xsrfToken = null
    let laravelSession = null
    
    for (const cookie of cookies!) {
        if (cookie.startsWith("XSRF-TOKEN=")) {
            /*    el token siempre termina con %3D, lo cual si se envia con esa terminacion sera invalido
                por eso se parsea para obtener lo que este antes del %   */
            xsrfToken = cookie.split("=")[1].split("%")[0]
        }
        else if (cookie.startsWith("laravel_session=")) {
            laravelSession = cookie.split("=")[1].split("%")[0]
        }
        if (xsrfToken && laravelSession) break
    }
    return {xsrfToken,laravelSession}
};



