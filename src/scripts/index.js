// CSS imports
import "../styles/styles.css";

import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#hamburger-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
    mobileDrawerContainer: document.querySelector("#mobile-navigation-drawer"),
    skipToContentButton: document.querySelector("#skip-to-content-button"),
  });
  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
