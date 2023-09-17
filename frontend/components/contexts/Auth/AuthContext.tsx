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
  publishTrip: (data: {}) => Promise<any>;
  deleteTrip: (id: string) => Promise<any>;
  getTrips: () => Promise<any>;
  searchTrip: (data: {}) => Promise<any>;
  searchResults: any[];
  getTrip: (id: string) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
  login: (email: string, password: string) => new Promise((resolve, reject) => {}),
  logout: () => new Promise((resolve, reject) => {}),
  signUp: (email: string, password: string, data: { first_name: string; last_name: string; phone: string }) => new Promise((resolve, reject) => {}),
  updateProfile: (data: {}) => new Promise((resolve, reject) => {}),
  publishTrip: (data: {}) => new Promise((resolve, reject) => {}),
  deleteTrip: (id: string) => new Promise((resolve, reject) => {}),
  getTrips: () => new Promise((resolve, reject) => {}),
  searchTrip: (data: {}) => new Promise((resolve, reject) => {}),
  getTrip: (id: string) => new Promise((resolve, reject) => {}),
  searchResults: [],
});

export const useAuth = () => useContext(AuthContext);
