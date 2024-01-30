import { EndPoints } from "."

export type GetData={
    endPoint:keyof typeof EndPoints
}