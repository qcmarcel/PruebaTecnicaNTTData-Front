export function isKeyOf<T extends object>(any_obj: T, possibleKey: keyof any): possibleKey is keyof T{
  return possibleKey in any_obj;
}
