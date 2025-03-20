import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { envs } from "./envs"

export default defineConfig({
  out: "./migrations",
  schema: "./database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: envs.DATABASE_URL
  }
})
