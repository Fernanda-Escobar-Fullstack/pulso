const REQUIRED_VARIABLES = ['DATABASE_URL', 'FRONTEND_URL'] as const;

export function validateEnvironment(
  environment: Record<string, unknown>,
): Record<string, unknown> {
  for (const variable of REQUIRED_VARIABLES) {
    if (typeof environment[variable] !== 'string' || !environment[variable]) {
      throw new Error(`${variable} is required`);
    }
  }

  const port = Number(environment.PORT ?? 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return {
    ...environment,
    PORT: port,
  };
}
