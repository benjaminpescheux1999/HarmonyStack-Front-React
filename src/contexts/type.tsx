export interface ILoginEvent {
    email: string;
    password: string;
}

export interface ISignupEvent {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  lastname: string;
}

export interface IUser {
  email: string;
  username: string;
  lastname: string;
  imageUrl?: string;
}

export interface IAuthContext {
  user: IUser | null; 
  setUser: (user: IUser | null) => void;
  login: (e: ILoginEvent) => void;
  logout: () => void;
  signup: (e: ISignupEvent) => void;
  handleChangeLanguage: (language: string) => void;
  // currentLanguage: string;
}

export interface IRootState {
    xsrfToken: {
        xsrfToken: string;
    };
    user: IUser | null;
}