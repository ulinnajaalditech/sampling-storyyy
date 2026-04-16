export const generateNavigation = () => {
  return `
        <div class="flex items-center gap-2">
          <a href="#/login" class="btn btn-primary">Login</a>
          <a href="#/register" class="btn btn-secondary">Register</a>
        </div>
    `;
};

export const generateNavigationAfterLogin = () => {
  return `
        <div class="flex items-center gap-2">
          <button id="logout-button" class="btn btn-secondary">Logout</button>
        </div>
    `;
};
