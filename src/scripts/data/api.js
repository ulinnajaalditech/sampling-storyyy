import CONFIG from "../config";
import { getAccessToken } from "../utils/auth";

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: (page = 1, size = 10, location = 0) =>
    `${CONFIG.BASE_URL}/stories?page=${page}&size=${size}&location=${location}`,
  STORY: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
};
export const AuthUserRegister = async (value) => {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
  const result = await response.json();

  return result.message;
};

export const AuthUserLogin = async (value) => {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  const result = await response.json();

  if (result?.error) {
    throw new Error(result.message);
  }

  return result;
};

export const GetStories = async () => {
  const response = await fetch(ENDPOINTS.STORIES(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const result = await response.json();

  if (result?.error) {
    throw new Error(result.message);
  }

  return result;
};

export const GetStory = async (id) => {
  const response = await fetch(ENDPOINTS.STORY(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const result = await response.json();

  if (result?.error) {
    throw new Error(result.message);
  }

  return result;
};
