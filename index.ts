import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { Pool, QueryResult } from 'pg'

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

app.get('/', (req: Request, res: Response) => {
    const pool = openDb()

    pool.query('select * from task', (error,result) => {
        if (error) {
            res.status(500).json({error: error.message})
        }
        res.status(200).json(result.rows)
    })
});

const openDb = (): Pool => {
    const pool: Pool = new Pool({
        /*user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'Thanh92',
        port: 5432,*/
        user: 'root',
        host: 'dpg-cgfkg682qv28tc03u6c0-a.oregon-postgres.render.com',
        database: 'todo_4fph',
        password: 'vbGntl8tl5INvv7wNxOyaW4LzVrJmKZf',
        port: 5432,
        ssl: true,
    })
    return pool;
}

app.post('/new', (req: Request, res: Response) => {
    const pool = openDb()

    pool.query('insert into task (description) values ($1) returning *',
    [req.body.description],
    (error: Error, result: QueryResult) => {
        if (error) {
            res.status(500).json({error: error.message})
        }
        res.status(200).json({id: result.rows[0].id})
})
})

app.delete("/delete/:id",async(req: Request, res: Response) => {   //part 5
    const pool = openDb()

    const id = parseInt(req.params.id)

    pool.query('delete from task where id = $1',
    [id],
    (error: Error, result: QueryResult) => {
        if (error) {
            res.status(500).json({error: error.message})
        }

        res.status(200).json({id: id})
    })
})

app.listen(port);