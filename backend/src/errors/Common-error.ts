export abstract class CommonError extends Error {
  abstract statusCode: number;
  abstract serializeErrors():
    | { message: string; field?: string }[]
    | { message: string; field?: string };
}
