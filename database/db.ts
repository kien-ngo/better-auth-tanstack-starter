import { envs } from "@/envs";
import { drizzle } from "drizzle-orm/node-postgres";
export const db = drizzle(envs.DATABASE_URL);
