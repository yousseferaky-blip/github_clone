export const GITHUB_API = 'https://api.github.com/users';
export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN
export const axiosConfig = {
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
};
