import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from './firebaseConfig';
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useFireAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the currentUser to state.
  const fireSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        return response.user;
      }
    );
  };

  const fireSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        return response.user;
      }
    );
  };

  const fireSignOut = () => {
    return signOut(auth).then(() => {
      setUser(false);
    });
  };

  const fireSendPasswordResetEmail = (email) => {
    return sendPasswordResetEmail(email).then(() => {
      return true;
    });
  };

  const fireConfirmPasswordReset = (code, password) => {
    return confirmPasswordReset(code, password).then(() => {
      return true;
    });
  };

  // Subscribe to currentUser on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the currentUser object and auth methods
  return {
    user,
    name,
    setName,
    fireSignIn,
    fireSignUp,
    fireSignOut,
    fireSendPasswordResetEmail,
    fireConfirmPasswordReset,
  };
}
