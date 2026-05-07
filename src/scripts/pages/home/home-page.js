import HomePresenter from "./home-presenter";
import * as StoryAPI from "../../data/api";
import { storyCard } from "../../template";
import Map from "../../utils/map";
import { storyMapper } from "../../data/api-mapper";

export default class HomePage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section class="container my-20 mx-auto">
        <div id="map" class="w-full h-96 mb-4"></div>
      
        <h1 class="text-3xl font-bold">Storyyy</h1>
        <div id="stories-content" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-2">

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

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 10,
      locate: true,
    });
  }

  renderStories(message, stories) {
    if (stories.length <= 0) {
      // this.populateReportsListEmpty();
      console.log("No Stories found");
      return;
    }

    const container = document.getElementById("stories-content");

    const html = stories.reduce((accumulator, story) => {
      if (this.#map) {
        const lat = parseFloat(String(story.lat));
        const lon = parseFloat(String(story.lon));

        const coordinate = [lat, lon];
        const markerOptions = { alt: story.name };
        const popupOptions = { content: story.description };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }

      return accumulator.concat(storyCard(story));
    }, "");

    container.innerHTML = html;
  }

  showLoader() {}
  hideLoader() {}
  mapLoader() {}
  mapLoaderHide() {}
}
