import HomePresenter from "./home-presenter";
import * as StoryAPI from "../../data/api";
import { storyCard } from "../../template";

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <section class="container my-20 mx-auto">
        <h1 class="text-3xl font-bold">Storyyy</h1>
        <div id="stories-content" class="grid grid-cols-3 items-center justify-center gap-2">

        </div>
        
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: StoryAPI,
    });

    this.#presenter.onGetStories();
  }

  renderStories(stories) {
    const container = document.getElementById("stories-content");
    container.innerHTML = stories?.map((story) => storyCard(story)).join("");
  }

  showLoader() {}
  hideLoader() {}
}
