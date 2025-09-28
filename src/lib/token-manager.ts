class TokenManager {
  static setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }
  }

  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  }

  static clear() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  }
}

export default TokenManager;
