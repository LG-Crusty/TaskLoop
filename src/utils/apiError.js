class ApiError extends Error {
  constructor(
    status,
    message = "something went wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
    this.data = null;
    this.success = false;

    stack
      ? (this.stack = stack)
      : Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
