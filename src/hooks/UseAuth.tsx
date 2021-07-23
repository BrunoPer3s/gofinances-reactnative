import React, { createContext, ReactNode, useContext, useState } from "react";

import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;
const { SCOPE } = process.env;

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthContextData = {
  data?: User;
  loading: boolean;
  isGoogleLoading: boolean;
  isAppleLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  logOut: () => Promise<void>;
};

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  async function signInWithGoogle() {
    try {
      setIsGoogleLoading(true);
      const EncodedUri = encodeURI(`${SCOPE}`);

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${EncodedUri}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();;

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };

        setData(userLogged);
        await AsyncStorage.setItem(
          "@gofinances: user",
          JSON.stringify(userLogged)
        );

      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsGoogleLoading(false);
    }
  }

  async function signInWithApple() {
    try {
      setIsAppleLoading(true);
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const userLogged = {
          id: String(credentials.user),
          email: credentials.email!,
          name: credentials.fullName?.givenName!,
          photo: `https://ui-avatars.com/api/?name=${credentials.fullName?.givenName}&length=1`,
        };

        setData(userLogged);

        await AsyncStorage.setItem(
          "@gofinances: user",
          JSON.stringify(userLogged)
        );
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsAppleLoading(false);
    }
  }

  async function getStoragedData() {
    const storagedData = await AsyncStorage.getItem("@gofinances: user");

    if (storagedData) {
      const user = JSON.parse(storagedData) as User;
      setData(user);
    }

    setLoading(false);
    //await AsyncStorage.removeItem('@gofinances: user');
  }

  async function logOut () {
    setData({} as User);
    await AsyncStorage.removeItem('@gofinances: user');
  }

  useEffect(() => {
    getStoragedData();
  }, []);

  return (
    <AuthContext.Provider value={
      { data, signInWithGoogle, signInWithApple, logOut, loading, isAppleLoading, isGoogleLoading }
      }>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
