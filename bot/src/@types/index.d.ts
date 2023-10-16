import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
    person: PersonTable
    books: BookTable
}

export interface PersonTable {
    id: Generated<number>
    name: string
    profile_picture: string
    created_at: ColumnType<Date, string | undefined, never>
}

export type Person = Selectable<PersonTable>
export type NewPerson = Insertable<PersonTable>
export type PersonUpdate = Updateable<PersonTable>

export interface BookTable {
    id: Generated<number>
    name: string
    url: string
    description: string
}

export type Book = Selectable<BookTable>
export type NewBook = Insertable<BookTable>
export type BookUpdate = Updateable<BookTable>