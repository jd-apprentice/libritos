#!/usr/bin/env node

import { db } from "../config/database.js"

export async function createSchema() {
    await db
        .schema
        .createTable(process.argv[2] || process.env.BOOKS_TABLE)
        .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
        .addColumn('name', 'string', (col) => col.notNull())
        .addColumn('url', 'string', (col) => col.notNull())
        .addColumn('image', 'string', (col) => col.notNull())
        .addColumn('description', 'text', (col) => col.notNull())
        .execute();

    await db
        .insertInto(process.argv[2] || process.env.BOOKS_TABLE)
        .values([
            {
                name: 'The Hobbit',
                url: 'https://web.seducoahuila.gob.mx/biblioweb/upload/J.R.R.%20Tolkien%20-%20El%20Hobbit.pdf',
                image: 'https://html.scribdassets.com/2mwbygnz281w5bt0/images/1-6344347f1b.jpg',
                description: 'The Hobbit is a children\'s fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.'
            },
            {
                name: 'The Lord of the Rings',
                image: 'https://www.readingsanctuary.com/wp-content/uploads/2018/03/the-lord-of-the-rings.png',
                url: 'https://gosafir.com/mag/wp-content/uploads/2019/12/Tolkien-J.-The-lord-of-the-rings-HarperCollins-ebooks-2010.pdf',
                description: 'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien\'s 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.'
            }
        ]).execute();
}