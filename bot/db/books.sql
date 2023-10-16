CREATE TABLE IF NOT EXISTS books (     
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description VARCHAR(255),
);

INSERT INTO books (id, name, url, description) VALUES
    (1, 'The Linux Command Life', 'https://files.jonathan.com.ar/Books/TLCL-13.07.pdf', 'Second internet edition'),
    (2, 'How Linux Works', 'https://files.jonathan.com.ar/Books/How-Linux-Works.pdf', 'What every superuser should know'),
    (3, 'Linux From Scratch', 'https://files.jonathan.com.ar/Books/LFS-11.3-SYSTEMD-BOOK.pdf', 'Systemd version');

-- Create Table

-- await db
--     .schema
--     .createTable('books')
--     .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
--     .addColumn('name', 'string', (col) => col.notNull())
--     .addColumn('url', 'string', (col) => col.notNull())
--     .addColumn('description', 'text')
--     .execute();

-- Insert Into

-- await db
--     .insertInto('books')
--     .values([
--         {
--             name: 'The Hobbit',
--             url: 'https://web.seducoahuila.gob.mx/biblioweb/upload/J.R.R.%20Tolkien%20-%20El%20Hobbit.pdf',
--             description: 'The Hobbit is a children\'s fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.'
--         },
--         {
--             name: 'The Lord of the Rings',
--             url: 'https://gosafir.com/mag/wp-content/uploads/2019/12/Tolkien-J.-The-lord-of-the-rings-HarperCollins-ebooks-2010.pdf',
--             description: 'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien\'s 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.'
--         }
--     ]).execute();