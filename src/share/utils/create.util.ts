export const createJWTPayload = <T = string>(param: T) => {
  return {
    param,
  };
};
