import RegisterPresenter from "./register-presenter";
import * as StoryAPI from "../../../data/api";

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
    <section
      class="max-w-md mx-auto min-h-[80vh] mt-20 flex flex-col gap-5 items-center justify-center"
    >
      <h1 class="text-4xl font-bold">Register to Storyyy</h1>
      <form id="register-form" class="flex flex-col gap-4 card px-6 py-4 w-full">
        <div class="flex flex-col gap-2">
          <label for="name" class="cs-label"> Nama </label>
          <input
            id="name"
            name="name"
            type="text"
            class="cs-input"
            placeholder="Masukan nama kamu"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="email" class="cs-label"> Email </label>
          <input
            id="email"
            name="email"
            type="email"
            class="cs-input"
            placeholder="Masukan email kamu"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password" class="cs-label"> Password </label>
          <input
            id="password"
            name="password"
            type="password"
            class="cs-input"
            placeholder="Masukan password kamu"
          />
        </div>
        <button id="register-btn" class="btn btn-primary">Register</button>
      </form>
    </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: StoryAPI,
    });

    this.setupForm();
  }

  setupForm() {
    const form = document.getElementById("register-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const data = {
        name: document.getElementById("name")?.value,
        email: document.getElementById("email")?.value,
        password: document.getElementById("password")?.value,
      };

      this.#presenter.onRegister(data);
    });
  }

  showLoader() {
    const btn = document.getElementById("register-btn");
    btn.innerHTML = "Loading...";
    btn.setAttribute("disabled", "true");
  }

  hideLoader() {
    const btn = document.getElementById("register-btn");
    btn.innerHTML = "Register";
    btn.removeAttribute("disabled");
  }
}
