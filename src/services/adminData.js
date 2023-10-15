import config from "../config";
export const getAdminUIData = async () => {
  const response = await fetch(config.endpoint);
  const data = await response.json();
  return data;
};
