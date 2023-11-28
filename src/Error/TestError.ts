export class TestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

// api 관련 에러
