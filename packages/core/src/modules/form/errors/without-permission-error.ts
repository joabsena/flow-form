export class WithoutPermissionError extends Error {
  constructor() {
    super('User does not have permission to perform this action.')
  }
}
