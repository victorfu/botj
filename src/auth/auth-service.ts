import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  User,
} from "firebase/auth";

interface AuthService {
  isAuthenticated: boolean;
  user: null | User;
  signIn(username: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

export const authService: AuthService = {
  isAuthenticated: false,
  user: null,
  async signIn(username: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, username, password);
    authService.isAuthenticated = true;
    authService.user = result.user;
  },
  async signOut() {
    await signOutFirebase(auth);
    authService.isAuthenticated = false;
    authService.user = null;
  },
};
