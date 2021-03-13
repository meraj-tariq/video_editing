class CustomHttpError extends Error {
    public payload: any;
  
    public responseCode?: number;
  
    public statusCode: number;
  
    public statusText?: string;
  
    public responseText?: string;
  
    constructor(
      message: string,
      extras: {
        statusCode: number;
        payload?: any;
        responseCode?: number;
        statusText?: string;
        responseText: string;
      }
    ) {
      super(message);
      this.name = "CustomHttpError";
      this.payload = extras.payload;
      this.responseCode = extras.responseCode;
      this.statusCode = extras.statusCode;
      this.statusText = extras.statusText;
      this.responseText = extras.responseText;
    }
  }
  
  export default CustomHttpError;
  
  export interface HttpResponse<T> {
    payload: T;
    responseCode: number;
    responseText: string;
  }
  