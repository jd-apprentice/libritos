import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";

export const db = new Kysely({
    dialect: new LibsqlDialect({
        url: process.argv[3] || process.env.TURSO_URL,
        authToken: process.argv[4] || process.env.TURSO_DB_TOKEN,
    }),
})