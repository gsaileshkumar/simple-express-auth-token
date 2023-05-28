export {};

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

export interface Token {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenPayload {
  user: string;
}
