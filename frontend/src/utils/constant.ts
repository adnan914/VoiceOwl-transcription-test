export const PUBLIC_PATH = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT: "/forgot-password",
  RESETPASSWORD: "/reset-password"
};

export const PRIVATE_PATH = {
  HOME: "/"
}

export const ROUTES_PATH = {
  ...PUBLIC_PATH,
  ...PRIVATE_PATH
};

export const pagePerOptions = [5, 10, 25];
export const limit = 10;


