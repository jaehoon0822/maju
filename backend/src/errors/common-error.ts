export abstract class commonError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): { message: string; field?: string }[];
}
