// Global prisma client which prevents hot reload from creating too many clients

// PrismaClient is used to interact with your database
import { PrismaClient } from '@prisma/client';

// extend the globalThis object by adding a prisma property
declare global {
  var prisma: PrismaClient | undefined;
}

// Makes a prisma client only if it does not exist
export const prismaClient = globalThis.prisma || new PrismaClient();
// assign the global object to prisma only if not in production since modules are not hot reloaded in production
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prismaClient;
}
