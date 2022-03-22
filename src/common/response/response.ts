export default class Response {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  public static success(message: string) {
    return new Response(200, message);
  }
}
