import React, { useContext, useReducer } from "react";
import { initalState, reducer } from "./Reducer";

//*init context box
const AuthStateContext = React.createContext();
const AuthDisptachrContext = React.createContext();

//*create custom hook to return state for consumer and use provider with consumer
export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw Error("useAuthState must be used with a AuthProvider!");
  }
  return context;
}
export function useAuthDispatch() {
  const context = useContext(AuthDisptachrContext);
  if (!context) {
    throw Error("useAuthDispatch must be used with a AuthProvider!");
  }
  return context;
}

//*use reducer instead useState and placing it in context
export function AuthProvider({ children }) {
  const [state, dispach] = useReducer(reducer, initalState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDisptachrContext.Provider value={dispach}>
        {children}
      </AuthDisptachrContext.Provider>
    </AuthStateContext.Provider>
  );
}
