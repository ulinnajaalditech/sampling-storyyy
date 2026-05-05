export const generateNavigation = () => {
  return `
        <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
          <a href="#/login" class="btn btn-primary">Login</a>
          <a href="#/register" class="btn btn-secondary">Register</a>
        </div>
    `;
};

export const generateNavigationAfterLogin = () => {
  return `
        <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
          <button id="logout-button" class="btn btn-secondary">Logout</button>
        </div>
    `;
};

export const storyCard = (story) => {
  return `
     <div class="card">
        <p class="text-3xl">${story.name}</p>
        <div class="relative h-40 w-auto bg-white">
          <img
            src="${story.photoUrl}"
            alt="${story.name}"
            class="w-full h-full object-contain border"
          />
        </div>
        <p>${story.description}</p>
        <div>
          <p>${new Date(story.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    `;
};
