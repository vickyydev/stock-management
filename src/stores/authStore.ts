import { makeAutoObservable } from "mobx";
import { registerUser, loginUser } from "../api/authApi";

class AuthStore {
  token: string | null = localStorage.getItem("token");
  username: string | null = localStorage.getItem("username");
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async register(username: string, password: string) {
    this.loading = true;
    this.error = null;
    try {
      const response = await registerUser({ username, password });
      if (response.data.success) {
        return response.data.message;
      }
    } catch (err: any) {
      this.error = err.response?.data?.message || "Registration failed";
    } finally {
      this.loading = false;
    }
  }

  async login(username: string, password: string) {
    this.loading = true;
    this.error = null;
    try {
      const response = await loginUser({ username, password });
      if (response.data.success) {
        this.token = response.data.data.token.access_token;
        this.username = response.data.data.token.username;
        if (this.token) {
          localStorage.setItem("token", this.token);
        }
        if (this.username) {
          localStorage.setItem("username", this.username);
        }

        return response.data.message;
      }
    } catch (err: any) {
      this.error = err.response?.data?.message || "Login failed";
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.token = null;
    this.username = null;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }
}

const authStore = new AuthStore();
export default authStore;
