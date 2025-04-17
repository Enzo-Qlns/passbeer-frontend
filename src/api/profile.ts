import api from ".";

const profileService = {
  getMe: async () => await api.get("/user/me"),
};

export default profileService;