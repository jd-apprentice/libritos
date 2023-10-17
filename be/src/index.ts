import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { db } from "./config/database";
import { generateHTML } from "./utils/template";

const app = new Elysia()
  .use(html())
  .use(cors())
  .get("/", () => "Welcome to the Libritos API!")
  .get("/books", async ({ query }) => {

    const result = await db
      .selectFrom('books')
      .selectAll()
      .offset(Number(query.offset) || 0)
      .limit(Number(query.limit) || 10)
      .execute()

    const response = generateHTML(result)
    return response
  })
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);