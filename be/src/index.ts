import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { db } from "./database";

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

        return `
    <html lang='en'>
      <head>
        <title>Bookshelf Online</title>
        <!-- Agrega los enlaces a los archivos CSS de Bootstrap -->
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        >
      </head>
      <body>
        <div class="container">
          <h1 class="mt-5">Libritos</h1>
          <div class="row mt-4">
            ${result.map(book => `
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${book.name}</h5>
                    <a target="_blank" href=${book.url} class="card-text">Link</a>
                    <p class="card-text pt-2">${book.description}</p>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </body>
    </html>
    `
    })
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);