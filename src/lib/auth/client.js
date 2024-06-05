import { login } from "@/molules/auth/api.js";
import { ROLE } from "@/utils/constant.js";

function generateToken() {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
}

const user = {
  id: "USR-000",
  avatar: "/assets/avatar.png",
  firstName: "Sofia",
  lastName: "Rivers",
  email: "sofia@devias.io",
  role: ROLE.ADMIN,
};

class AuthClient {
  async signUp() {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem("custom-auth-token", token);

    return {};
  }

  async signInWithOAuth() {
    return { error: "Social authentication not implemented" };
  }

  async signInWithPassword(params) {
    const { email, password } = params;

    // Make API request
    const response = await login({ email, password });

    if (response.status === 200) {
      response.data.accessToken;
    }
    // if (email !== "sofia@devias.io" || password !== "Secret1") {
    //   // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    //   return { error: "Invalid credentials" };
    // }

    const token = response.data.accessToken;
    localStorage.setItem("custom-auth-token", token);

    return {};
  }

  async resetPassword() {
    return { error: "Password reset not implemented" };
  }

  async updatePassword() {
    return { error: "Update reset not implemented" };
  }

  async getUser() {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem("custom-auth-token");

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut() {
    localStorage.removeItem("custom-auth-token");

    return {};
  }
}

export const authClient = new AuthClient();
