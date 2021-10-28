export default class usersError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
