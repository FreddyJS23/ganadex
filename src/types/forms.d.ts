import { castleShema } from "@/validations/castleShema";
import { z } from "zod";

export type Login = {
    usuario: string;
    password: string;
};

export type CreateUser = {
    nombre: string;
    apellido: string;
    usuario: string;
    correo: string;
    password: string;
    password2: string;
};

export type CreateCastle=z.infer<typeof castleShema>