export default class authError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
