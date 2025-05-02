import pg from 'pg'

export const  pool = new pg.Pool({
    user:"postgres",
    host:"localhost",
    password:"postgres",
    database:"ufps",
    port:"5432",
})

