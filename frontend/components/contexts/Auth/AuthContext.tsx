import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

interface AuthContextType {
  user?: User | null;
  session?: Session | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  signUp: (
    email: string,
    password: string,
    data: {
      first_name: string;
      last_name: string;
      phone: string;
    },
  ) => Promise<any>;
  updateProfile: (data: {}) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
  login: (email: string, password: string) => new Promise((resolve, reject) => {}),
  logout: () => new Promise((resolve, reject) => {}),
  signUp: (email: string, password: string, data: { first_name: string; last_name: string; phone: string }) => new Promise((resolve, reject) => {}),
  updateProfile: (data: {}) => new Promise((resolve, reject) => {}),
});

export const useAuth = () => useContext(AuthContext);
