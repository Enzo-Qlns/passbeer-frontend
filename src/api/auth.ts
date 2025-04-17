import api from ".";

const authService = {
  authenticate: async (username: string, password: string) =>
    await api.post("/auth/login", { username, password }),
  logout: async () => await api.get("/logout"),
  register: async (email: string, password: string) =>
    await api.post("/auth/register", { email, password }),
};

export default authService;