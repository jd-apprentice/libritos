import { Book } from "../@types";

export function generateHTML(books: Book[]) {
  return `
      <html lang='en'>
        <head>
          <title>Bookshelf Online</title>
          <!-- Agrega los enlaces a los archivos CSS de Bootstrap -->
          <link 
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"
          >
        </head>
        <body>
          <div class="container">
          <h1 class="mt-5">Libritos</h1>
            <div class="row mt-4">
              ${books.map((book, index) => `
                <div class="col-lg-4 col-md-6 mb-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title text-truncate">${book.name}</h5>
                      <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-outline-dark"> 
                          <a target="_blank" href=${book.url} class="card-text text-decoration-none">Download</a>
                        </button>
                        <button class="btn btn-outline-info text-decoration-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false">
                          Show Description
                        </button>
                      </div>
                      <div class="collapse" id="collapse${index}">
                        <p class="card-text pt-2">${book.description}</p>
                      </div>
                    </div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
      </html>
    `;
}
