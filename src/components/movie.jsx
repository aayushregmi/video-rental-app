import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import Search from "./common/search";

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  componentDidMount = async () => {
    const { data: genresList } = await getGenres();
    const { data: moviesList } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...genresList];
    this.setState({ movies: moviesList, genres });
  };

  renderMoviesLengthMessage = (totalCount) => {
    return totalCount > 0
      ? "Showing " + totalCount + " movies in the database."
      : "There are no movies in the database.";
  };

  handleDelete = async (id) => {
    const originalMovies = this.state.movies;

    let newMoviesList = this.state.movies.filter((movie) => {
      return movie._id !== id;
    });
    this.setState({ movies: newMoviesList });

    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error(ex.response.data);
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleItemSelect = (item) => {
    this.setState({ selectedGenre: item, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (input) => {
    this.setState({ searchQuery: input, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery) {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();
    const { user } = this.props;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleItemSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          {user && (
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
          )}
          <p>{this.renderMoviesLengthMessage(totalCount)}</p>
          <Search
            name="search"
            value={searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            user={user}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
