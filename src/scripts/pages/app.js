import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import { generateNavigation, generateNavigationAfterLogin } from "../template";
import { getAccessToken, removeAccessToken } from "../utils/auth";
import { setupSkipToContent, transitionHelper } from "../utils/index";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #mobileDrawerContainer = null;
  #skipToContentButton = null;

  constructor({
    navigationDrawer,
    drawerButton,
    content,
    mobileDrawerContainer,
    skipToContentButton,
  }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#mobileDrawerContainer = mobileDrawerContainer;
    this.#skipToContentButton = skipToContentButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipToContentButton, this.#content);
    this.#setupDrawer();
    this.#setupNavigationList();
  }

  #setupNavigationList() {
    const login = getAccessToken();
    const mobileContainer = this.#mobileDrawerContainer.querySelector(
      "#mobile-navigation-drawer-content",
    );

    if (!login) {
      this.#navigationDrawer.innerHTML = generateNavigation();
      mobileContainer.innerHTML = generateNavigation();
    } else {
      this.#navigationDrawer.innerHTML = generateNavigationAfterLogin();
      mobileContainer.innerHTML = generateNavigationAfterLogin();
      this.#navigationDrawer
        .querySelector("#logout-button")
        .addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          removeAccessToken();
          location.reload();
        });
      mobileContainer
        .querySelector("#logout-button")
        .addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          removeAccessToken();
          location.reload();
        });
    }

    this.#attachMobileNavLinkListeners();
  }

  #attachMobileNavLinkListeners() {
    const container = this.#mobileDrawerContainer.querySelector(
      "#mobile-navigation-drawer-content",
    );
    if (!container) return;
    container.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      this.#mobileDrawerContainer.setAttribute("aria-hidden", "true");
      this.#mobileDrawerContainer.classList.add("-right-100");
      this.#mobileDrawerContainer.classList.remove("right-0");
    });
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
