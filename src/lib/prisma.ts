import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // TODO: Make this edge-compatible
  // to make prisma compatible with edge runtime support
  const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
  const adapter=new PrismaNeon(neon)
  return new PrismaClient({adapter: adapter});
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
