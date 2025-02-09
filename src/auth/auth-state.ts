import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { authService } from "./auth-service";

let authStatePromise: Promise<void>;

// Initialize the promise immediately
authStatePromise = new Promise((resolve) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    updateAuthState(user);
    unsubscribe(); // Unsubscribe after first load
    resolve();
  });
});

// Set up ongoing auth state monitoring
onAuthStateChanged(auth, updateAuthState);

function updateAuthState(user: User | null) {
  authService.isAuthenticated = !!user;
  authService.user = user;
}

export function waitForAuthReady() {
  return authStatePromise;
}
