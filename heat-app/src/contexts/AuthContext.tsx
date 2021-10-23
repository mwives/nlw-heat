import React, { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

const CLIENT_ID = "fde0396dec5ce23e19e9";
const SCOPE = "read:user";
const USER_STORAGE = "@nlwheat:user";
const TOKEN_STORAGE = "@nlwheat:token";

interface User {
  login: string;
  id: string;
  name: string;
  avatar_url: string;
}

interface AuthContextData {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthSessionResponse {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function signIn() {
    try {
      setIsSigningIn(true);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = (await AuthSession.startAsync({
        authUrl,
      })) as AuthSessionResponse;

      if (
        authSessionResponse.type === "success" &&
        authSessionResponse.params.error !== "access_denied"
      ) {
        const { data } = await api.post<AuthResponse>("/authenticate", {
          code: authSessionResponse.params.code,
        });
        
        const { user, token } = data;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUser(null);
    
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenStorage}`;

        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSigningIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
