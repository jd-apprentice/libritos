import { db } from "../config/database";

const checkHealth = async () => db.selectFrom("books").selectAll().executeTakeFirst();

export { checkHealth };