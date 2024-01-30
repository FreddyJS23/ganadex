type login = {
    id: number;
    usuario: string;
    token: string;
};

export type ResponseRegistroExitoso = {
    message: string;
};

export type ResponseLogin = {
    login: login;
};
