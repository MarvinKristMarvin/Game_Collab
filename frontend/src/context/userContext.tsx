import React, { createContext, useState, useContext, ReactNode } from "react";

// Define a User type (customize as needed)
export interface LoggedUserInterface {
  id: number;
  mail: string;
  name: string | null;
  age: number | null;
  available: boolean | null;
  description: string | null;
  portfolio_url: string | null;
  profile_mail: string | null;
  jobs: string[] | null;
  languages: string[] | null;
  remunerations: string[] | null;
}

// Define context types
interface LoggedUserContextInterface {
  loggedUser: LoggedUserInterface | null;
  setLoggedUser: (user: LoggedUserInterface | null) => void;
}

// Create the context with a default value
const LoggedUserContext = createContext<LoggedUserContextInterface | undefined>(
  undefined
);

// Provider component
export const LoggedUserProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUserInterface | null>(
    null
  );

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

// Hook for using the context
export const useLoggedUser = () => {
  const context = useContext(LoggedUserContext);
  if (!context) {
    throw new Error("useLoggedUser must be used within a LoggedUserProvider");
  }
  return context;
};
