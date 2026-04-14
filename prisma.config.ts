import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/spiritual_platform?schema=public',
  },
  schema: 'prisma/schema.prisma',
});
