import Response from './response';

export default class DataResponse<T> extends Response {
  data: T;

  constructor(status: number, message: string, data: T) {
    super(status, message);
    this.data = data;
  }

  public static dataSuccess<T>(message: string, data: T): DataResponse<T> {
    return new DataResponse(200, message, data);
  }
}
