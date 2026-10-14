import { validateEnvironment } from './environment.js';

describe('validateEnvironment', () => {
  it('returns a normalized valid configuration', () => {
    const result = validateEnvironment({
      DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/pulso',
      FRONTEND_URL: 'http://localhost:5173',
      PORT: '3000',
    });

    expect(result.PORT).toBe(3000);
  });

  it('rejects a missing database URL', () => {
    expect(() =>
      validateEnvironment({ FRONTEND_URL: 'http://localhost:5173' }),
    ).toThrow('DATABASE_URL is required');
  });

  it('rejects an invalid port', () => {
    expect(() =>
      validateEnvironment({
        DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/pulso',
        FRONTEND_URL: 'http://localhost:5173',
        PORT: 'invalid',
      }),
    ).toThrow('PORT must be an integer between 1 and 65535');
  });
});
