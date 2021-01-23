import http from "./httpService";
import config from "../config.json";

export function registerUser(user){
    return http.post(config.apiEndpoints.users, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}