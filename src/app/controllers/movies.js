import Base from "./_base";
import Movie from "./movie";

export default class Movies extends Base {
  constructor(movies) {
    if (movies.Response === "False") {
      super(window["template-movies-not-found"], "#movies-container");
    } else {
      super(window["template-movies"], "#movies-container");
      this.movies = movies;
      this.init();
    }
  }

  init() {
    this.movieWrapper = this.rootEl.querySelector(".movie-wrapper");
    this.renderMovies();
  }

  renderMovies() {
    this.movies.Search.forEach((movie) => {
      const wrapperEl = document.createElement("div");
      this.movieWrapper.appendChild(wrapperEl);
      new Movie(movie, wrapperEl);
    });
  }
}
