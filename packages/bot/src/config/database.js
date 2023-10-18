import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";

export const db = new Kysely({
    dialect: new LibsqlDialect({
        url: process.env.TURSO_URL,
        authToken: process.env.TURSO_DB_TOKEN,
    }),
})