import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { Pool, RowDataPacket } from 'mysql2'; // Adjusted import for MySQL
import { QueryError, ResultSetHeader } from 'mysql2';
require('dotenv').config();

const app: Express = express()
const mysql = require('mysql2');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

const openDb = (): Pool => {
    const pool: Pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: 'tododb',
        password: process.env.DB_PASSWORD,
        port: 3306, 
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    return pool;
};

app.get('/', (req: Request, res: Response) => {
    const pool = openDb()

    pool.query('select * from task', (error,result) => {
        if (error) {
            res.status(500).json({error: error.message})
        }
        res.status(200).json(result)
    })
});

app.post('/new', (req: Request, res: Response) => {
    const pool = openDb();

    pool.query(
        'INSERT INTO task (description) VALUES (?)',
        [req.body.description],
        (error, result) => {
            if (error) {
                res.status(500).json({ error: error.message });
            }

            const insertId: number = (result as ResultSetHeader).insertId;
            res.status(200).json({ id: insertId });
        }
    );
});

app.delete('/delete/:id', (req: Request, res: Response) => {
    const pool = openDb();

    const id = parseInt(req.params.id);

    pool.query('DELETE FROM task WHERE id = ?', [id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }

        res.status(200).json({ id: id });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});