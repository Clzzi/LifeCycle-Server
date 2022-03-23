export interface IToken {
  userId: string;
  iss: string;
  sub: string;
}

export interface ITokenPayload {
  userId: string;
}