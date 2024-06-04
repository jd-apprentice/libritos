import { Query } from "../@types";
import { db } from "../config/database";

const findAllBooks = async (query: Query) => {
    return db
        .selectFrom('books')
        .selectAll()
        .offset(Number(query.offset) || 0)
        .limit(Number(query.limit) || 10)
        .execute()
};

const findBookById = async (id: number) => {
    return db.selectFrom('books').where('id', '=', id).selectAll().executeTakeFirst()
};

export { findBookById, findAllBooks };