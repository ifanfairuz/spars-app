export default class ErrorException extends Error {
  status: boolean = false;
  error?: string;
  errorObject?: any;

  /**
   * constructor
   * @param {boolean} status 
   * @param {string} message 
   * @param {string} error 
   */
  constructor(status: boolean, message: string, error?: string, errorObject?: any)
  {
    super(message);
    this.status = status;
    this.error = error;
    this.errorObject = errorObject;
  }

  /**
   * create error
   * @param {any} data 
   * @param {any} error
   * @returns {ErrorException}
   */
   static create(data: any, error: any)
   {
      return new ErrorException(data?.msg == 'success', data?.message || data?.msg, data?.error, error);
   }
}