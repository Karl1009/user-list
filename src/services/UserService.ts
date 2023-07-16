import axios, { AxiosResponse } from "axios";
import endpoint from "../endpoint";
import { IUser } from "./types";

interface Axios<T> {
    data: T
}

class UserService {

    async getUsers() {
        return endpoint.get<IUser[]>("https://jsonplaceholder.typicode.com/users")
    }

}

const userService = new UserService();

export default userService;