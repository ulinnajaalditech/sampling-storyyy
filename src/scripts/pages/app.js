import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import { generateNavigation, generateNavigationAfterLogin } from "../template";
import { getAccessToken } from "../utils/auth";
import { transitionHelper } from "../utils/index";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupNavigationList() {
    const login = getAccessToken();
    if (!login) {
      console.log("aku belum login");
      this.#navigationDrawer.innerHTML = generateNavigation();
      return;
    }
    this.#navigationDrawer.innerHTML = generateNavigationAfterLogin();
    console.log("akulogin");
  }

  #setupDrawer() {
    // this.#drawerButton.addEventListener("click", () => {
    //   this.#navigationDrawer.classList.toggle("open");
    // });
    // document.body.addEventListener("click", (event) => {
    //   if (
    //     !this.#navigationDrawer.contains(event.target) &&
    //     !this.#drawerButton.contains(event.target)
    //   ) {
    //     this.#navigationDrawer.classList.remove("open");
    //   }
    //   this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
    //     if (link.contains(event.target)) {
    //       this.#navigationDrawer.classList.remove("open");
    //     }
    //   });
    // });
  }

  //   async renderPage() {
  //     const url = getActiveRoute();
  //     const page = routes[url];

  //     this.#content.innerHTML = await page.render();
  //     await page.afterRender();
  //   }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: "instant" });
      this.#setupNavigationList();
    });
  }
}

export default App;
