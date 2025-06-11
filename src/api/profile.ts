import { API_ENDPOINTS } from "./constants";

import api from ".";

const profileService = {
  getMe: async () => await api.get(API_ENDPOINTS.USER_ME),
};

export default profileService;