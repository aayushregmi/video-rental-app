import http from "./httpService";
import config from "../config.json";

export function getMovies() {
    return http.get(config.apiEndpoints.movies);
}

export function saveMovie(movie) {
    return movie._id?updateMovie(movie):createMovie(movie);
}

function createMovie(movie) {
    return http.post(config.apiEndpoints.movies, movie);
}

function updateMovie(movie) {
    const {_id: id}= movie;
    delete movie._id;
    return http.put(config.apiEndpoints.movies+"/"+id, movie);
}

export function getMovie(id) {
    return http.get(config.apiEndpoints.movies+'/'+id);
}

export function deleteMovie(id){
    return http.delete(config.apiEndpoints.movies+'/'+id);
}