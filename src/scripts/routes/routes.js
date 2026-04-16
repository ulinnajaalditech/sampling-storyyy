import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";

const routes = {
  "/": () => new HomePage(),
  "/login": () => new LoginPage(),
  "/register": () => new RegisterPage(),
  "/about": () => new AboutPage(),
};

export default routes;
