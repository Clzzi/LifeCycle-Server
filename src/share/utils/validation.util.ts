export const validationNullORUndefined = (data?: string | object): boolean => {
  if (data === undefined || data === null) {
    return true;
  }
  return false;
};
