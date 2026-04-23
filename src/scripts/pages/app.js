import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import { generateNavigation, generateNavigationAfterLogin } from "../template";
import { getAccessToken } from "../utils/auth";
import { setupSkipToContent, transitionHelper } from "../utils/index";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #mobileDrawerContainer = null;
  #skipToContentButton = null;
  #mobileDrawerContent = null;

  constructor({
    navigationDrawer,
    drawerButton,
    content,
    mobileDrawerContainer,
    skipToContentButton,
    mobileDrawerContent,
  }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#mobileDrawerContainer = mobileDrawerContainer;
    this.#skipToContentButton = skipToContentButton;
    this.#mobileDrawerContent = mobileDrawerContent;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipToContentButton, this.#content);
    this.#setupDrawer();
  }

  #setupNavigationList() {
    const login = getAccessToken();
    if (!login) {
      this.#navigationDrawer.innerHTML = generateNavigation();
      this.#mobileDrawerContainer.querySelector(
        "#mobile-navigation-drawer-content",
      ).innerHTML = generateNavigation();
      return;
    }
    this.#navigationDrawer.innerHTML = generateNavigationAfterLogin();
    this.#mobileDrawerContainer.querySelector(
      "#mobile-navigation-drawer-content",
    ).innerHTML = generateNavigationAfterLogin();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#mobileDrawerContainer.setAttribute("aria-hidden", "false");

      this.#mobileDrawerContainer.classList.remove("-right-100");
      this.#mobileDrawerContainer.classList.add("right-0");
    });

    this.#mobileDrawerContainer
      .querySelector("#mobile-drawer-close")
      .addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#mobileDrawerContainer.setAttribute("aria-hidden", "true");

        this.#mobileDrawerContainer.classList.add("-right-100");
        this.#mobileDrawerContainer.classList.remove("right-0");
      });

    console.log(this.#mobileDrawerContent.querySelectorAll("a"));
  }

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
