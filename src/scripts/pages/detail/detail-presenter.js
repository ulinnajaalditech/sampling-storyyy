import { storyMapper } from "../../data/api-mapper";

export default class HomePresenter {
  #view;
  #model;

  constructor(storyId, { view, model }) {
    this.storyId = storyId;
    this.#view = view;
    this.#model = model;
  }

  async initMap() {
    this.#view.mapLoader();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.log(error);
    } finally {
      this.#view.mapLoaderHide();
    }
  }

  async onGetStory() {
    this.#view.showLoader();

    try {
      await this.initMap();
      const response = await this.#model.GetStory(this.storyId);
      const results = await storyMapper(response?.story);

      this.#view.renderStory(response?.message || "success", results);
    } catch (error) {
      console.log(error);
    } finally {
      this.#view.hideLoader();
    }
  }
}
