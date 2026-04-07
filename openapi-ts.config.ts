import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:8080/v3/api-docs',
  output: 'src/generated/claim-api',
  plugins: ['@hey-api/client-axios'],
});
