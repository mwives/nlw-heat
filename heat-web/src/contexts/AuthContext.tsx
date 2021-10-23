import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface User {
  login: string;
  id: string;
  name: string;
  avatar_url: string;
}

interface AuthContextData {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthResponse {
  token: string;
  user: {
    login: string;
    id: string;
    name: string;
    avatar_url: string;
  };
}

interface ProfileResponse {
  user: User;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl =
    "https://github.com/login/oauth/authorize?scope=user&client_id=829802617e9bbb2b9fb4";

  async function signOut() {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  }

  async function signIn(githubCode: string) {
    try {
      const { data } = await api.post<AuthResponse>("authenticate", {
        code: githubCode,
      });

      const { token, user } = data;

      localStorage.setItem("@dowhile:token", token);

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setUser(user);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function recoverUserInfo() {
      try {
        const token = localStorage.getItem("@dowhile:token");

        if (token) {
          api.defaults.headers.common.authorization = `Bearer ${token}`;

          const { data } = await api.get<ProfileResponse>("profile");

          const { user } = data;

          setUser(user);
        }
      } catch (err) {
        console.log(err);
      }
    }

    recoverUserInfo();
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInUrl, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
