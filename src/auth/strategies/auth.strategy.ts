export type UserToken = {
  sub?: number;
  username?: string;
};

export interface AuthStrategy {
  getTokenValue(): UserToken;
  verifyToken(token: string): Promise<void>;
}
