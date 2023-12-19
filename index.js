"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = (0, express_1.default)();
const mysql = require('mysql2');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = 3001;
const openDb = () => {
    const pool = mysql.createPool({
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
app.get('/', (req, res) => {
    const pool = openDb();
    pool.query('select * from task', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(result);
    });
});
app.post('/new', (req, res) => {
    const pool = openDb();
    pool.query('INSERT INTO task (description) VALUES (?)', [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        const insertId = result.insertId;
        res.status(200).json({ id: insertId });
    });
});
app.delete('/delete/:id', (req, res) => {
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
