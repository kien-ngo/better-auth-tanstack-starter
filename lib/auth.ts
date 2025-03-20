import { betterAuth, type SecondaryStorage } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/database/db"
import * as schema from "@/database/schema"
import { envs } from "@/envs"
import { Redis } from "ioredis"

const enableRedis = envs.ENABLE_REDIS === "true"

const redis = new Redis(`${process.env.REDIS_URL}?family=0`)
  .on("error", (err) => {
    console.error("Redis connection error:", err)
  })
  .on("connect", () => {
    console.log("Redis connected")
  })
  .on("ready", () => {
    console.log("Redis ready")
  })

const secondaryStorage = enableRedis
  ? ({
      get: async (key) => {
        const value = await redis.get(key)
        return value ? value : null
      },
      set: async (key, value, ttl) => {
        if (ttl) {
          await redis.set(key, value, "EX", ttl)
        } else {
          await redis.set(key, value)
        }
      },
      delete: async (key) => {
        await redis.del(key)
      }
    } satisfies SecondaryStorage)
  : undefined

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema
  }),
  emailAndPassword: {
    enabled: true
  },
  secondaryStorage
})
