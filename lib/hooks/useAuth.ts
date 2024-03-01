import { useContext } from "react";
import { AuthContext } from "../context/firebase-auth-context";

export const useAuth = () => useContext(AuthContext) as any;
