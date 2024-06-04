import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { healthService } from "./services/health";
import { bookService } from "./services/books";

const app = new Elysia()
  .use(cors())
  .get("/v1/api", () => "Welcome to Libritos API!")
  .get("/v1/health", async () => healthService.check())
  .get("/v1/books", async ({ query }) => bookService.findAll(query))
  .get("/v1/books/:id", async ({ params: { id } }) => bookService.findById(Number(id)))
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);