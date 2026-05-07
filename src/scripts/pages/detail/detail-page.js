import * as StoryAPI from "../../data/api";
import { parseActivePathname } from "../../routes/url-parser";
import { storyCard } from "../../template";
import Map from "../../utils/map";
import DetailPresenter from "./detail-presenter";

export default class DetailPage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section class="container my-20 mx-auto">
      <div class="flex items-center justify-between">
      <h1 id="name-story"></h1>
      <p id="location"></p>
      </div>
       <p id="description-story"></p>
        <img id="photo-story" class="w-full h-64 object-cover mb-4" />
        <div id="map" class="w-full h-96 mb-4"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new DetailPresenter(parseActivePathname().id, {
      view: this,
      model: StoryAPI,
    });

    this.#presenter.onGetStory();
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 10,
      locate: true,
    });
  }

  renderStory(message, story) {
    const text = document.getElementById("name-story");
    const description = document.getElementById("description-story");
    const photo = document.getElementById("photo-story");
    const location = document.getElementById("location");

    if (this.#map) {
      const storyCordinate = [story.lat, story.lon];
      const markerOptions = { alt: story.name };
      const popupOptions = { content: story.name };

      this.#map.changeCamera(storyCordinate);
      this.#map.addMarker(storyCordinate, markerOptions, popupOptions);
    }

    description.innerHTML = story.description;
    photo.src = story.photoUrl;
    photo.alt = story.name;
    text.innerHTML = story.name;
    location.innerHTML = story.location?.placeName || "Location not found";
  }

  showLoader() {}
  hideLoader() {}
  mapLoader() {}
  mapLoaderHide() {}
}
