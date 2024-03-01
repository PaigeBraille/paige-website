import type { FC, ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  updatePassword,
  confirmPasswordReset,
  applyActionCode,
} from "firebase/auth";
import { firebaseApp } from "../firebase";

const auth = getAuth(firebaseApp);

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: {} | null;
}

export interface AuthContextValue extends State {
  platform: "Firebase";
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  sendPasswordReset: (email: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  updateUserPassword: (newPassword: string) => Promise<any>;
  handlePasswordReset: (newPassword: string, oobCode: string) => Promise<void>;
  handleVerifyEmail: (oobCode: string) => Promise<void>;
  sendVerificationEmail: () => Promise<any>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

enum ActionType {
  AUTH_STATE_CHANGED = "AUTH_STATE_CHANGED",
}

type AuthStateChangedAction = {
  type: ActionType.AUTH_STATE_CHANGED;
  payload: {
    isAuthenticated: boolean;
    user: {} | null;
  };
};

type Action = AuthStateChangedAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: State, action: Action): State => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: "Firebase",
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  sendPasswordReset: () => Promise.resolve(),
  handlePasswordReset: () => Promise.resolve(),
  handleVerifyEmail: () => Promise.resolve(),
  updateUserPassword: () => Promise.resolve(),
  sendVerificationEmail: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Here you should extract the complete user profile to make it available in your entire app.
          // The auth state only provides basic information.
          dispatch({
            type: ActionType.AUTH_STATE_CHANGED,
            payload: {
              isAuthenticated: true,
              user: {
                id: user.uid,
                avatar: user.photoURL || "/static/esoxSwimming.jpg",
                email: user.email || "anika.visser@devias.io",
                emailVerified: user.emailVerified || false,
                name: "Anika Visser",
                plan: "Premium",
              },
            },
          });
        } else {
          dispatch({
            type: ActionType.AUTH_STATE_CHANGED,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    [dispatch],
  );

  const _signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  };

  const handlePasswordReset = async (
    newPassword: string,
    oobCode: string,
  ): Promise<void> => {
    await confirmPasswordReset(auth, oobCode, newPassword);
  };

  const updateUserPassword = async (newPassword: string): Promise<void> => {
    if (!auth.currentUser) return;
    await updatePassword(auth.currentUser, newPassword);
  };

  const sendVerificationEmail = async (): Promise<void> => {
    if (!auth.currentUser) return;
    sendEmailVerification(auth.currentUser);
  };

  const handleVerifyEmail = async (oobCode: string): Promise<void> => {
    await applyActionCode(auth, oobCode);
  };

  const _createUserWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<void> => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "Firebase",
        createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
        signInWithEmailAndPassword: _signInWithEmailAndPassword,
        sendPasswordReset,
        handlePasswordReset,
        handleVerifyEmail,
        signInWithGoogle,
        updateUserPassword,
        sendVerificationEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
