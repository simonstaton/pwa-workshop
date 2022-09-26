import Base from "./_base";

export default class Movie extends Base {
  isOpen = false;

  movieDetail = null;

  constructor(movie, container) {
    super(window["template-movie"], container);
    this.movie = movie;
    this.init();
    this.bindEvents();
  }

  init(rootEl) {
    this.image = this.rootEl.querySelector(".movie-image");
    this.btn = this.rootEl.querySelector(".movie-btn");
    this.title = this.rootEl.querySelector(".movie-title");
    this.details = {
      title: this.rootEl.querySelector(".movie-details-title"),
      year: this.rootEl.querySelector(".movie-details-year"),
      released: this.rootEl.querySelector(".movie-details-released"),
      runtime: this.rootEl.querySelector(".movie-details-runtime"),
      genre: this.rootEl.querySelector(".movie-details-genre"),
      director: this.rootEl.querySelector(".movie-details-director"),
      writer: this.rootEl.querySelector(".movie-details-writer"),
      actors: this.rootEl.querySelector(".movie-details-actors"),
      plot: this.rootEl.querySelector(".movie-details-plot"),
      language: this.rootEl.querySelector(".movie-details-language"),
      country: this.rootEl.querySelector(".movie-details-country"),
      rating: this.rootEl.querySelector(".movie-details-rating"),
    };
    this.image.src =
      this.movie.Poster === "N/A"
        ? "https://www.fillmurray.com/300/450"
        : this.movie.Poster;
    this.title.innerHTML = this.movie.Title;
  }

  bindEvents() {
    this.rootEl.addEventListener("click", this.toggleDetails.bind(this));
  }

  async toggleDetails() {
    this.isOpen = !this.isOpen;
    this.rootEl.classList[this.isOpen ? "add" : "remove"](
      "movie-card-wrapper--active"
    );
    if (!this.movieDetail) {
      this.movieDetail = await this.getMovieDetail();
      this.details.title.innerHTML = this.movieDetail.Title;
      this.details.year.innerHTML = this.movieDetail.Year;
      this.details.released.innerHTML = this.movieDetail.Released;
      this.details.runtime.innerHTML = this.movieDetail.Runtime;
      this.details.genre.innerHTML = this.movieDetail.Genre;
      this.details.director.innerHTML = this.movieDetail.Director;
      this.details.writer.innerHTML = this.movieDetail.Writer;
      this.details.actors.innerHTML = this.movieDetail.Actors;
      this.details.plot.innerHTML = this.movieDetail.Plot;
      this.details.language.innerHTML = this.movieDetail.Language;
      this.details.country.innerHTML = this.movieDetail.Country;
      this.details.rating.innerHTML = this.movieDetail.imdbRating;
    }
  }

  async getMovieDetail() {
    const params = new URLSearchParams({
      i: this.movie.imdbID,
      apiKey: "925a5af6",
    });
    try {
      const response = await fetch(`https://omdbapi.com?${params.toString()}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn(err);
    }
    return null;
  }
}
