export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async onGetStories() {
    this.#view.showLoader();

    try {
      const response = await this.#model.GetStories();
      this.#view.renderStories(response?.listStory || []);
    } catch (error) {
      console.log(error);
    } finally {
      this.#view.hideLoader();
    }
  }
}
