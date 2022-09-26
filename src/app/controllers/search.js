import Base from "./_base";
import Movies from "./movies";

export default class Search extends Base {
  constructor() {
    super(window["template-search"], "#search-container");
    this.init();
    this.bindEvents();
  }

  init() {
    this.form = this.rootEl;
    this.searchSubmit = this.form.querySelector(".search-submit");
    this.searchLoading = this.form.querySelector(".search-loading");
  }

  bindEvents() {
    this.form.addEventListener("submit", this.onSubmit.bind(this));
  }

  async onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    this.searchSubmit.style.display = "none";
    this.searchLoading.style.display = "flex";
    const data = await this.getMovies(formProps);
    this.searchSubmit.style.display = "block";
    this.searchLoading.style.display = "none";
    new Movies(data);
  }

  async getMovies(formData) {
    const params = new URLSearchParams({
      s: formData.title,
      y: formData.year,
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
