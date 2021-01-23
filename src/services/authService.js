import jwtDecode from 'jwt-decode';
import http from "./httpService";
import config from "../config.json";

const tokenKey = "token";

http.setToken(getCurrentToken());

export async function login(email, password){
    const {data: token} = await http.post(config.apiEndpoints.login, {email, password});
    localStorage.setItem(tokenKey, token);
}

export function loginWithJWT(token) {
    localStorage.setItem(tokenKey, token);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        return jwtDecode(localStorage.getItem(tokenKey));
    } catch (error) {
        
    }
}

export function getCurrentToken() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    loginWithJWT,
    logout,
    getCurrentUser,
    getCurrentToken
}

