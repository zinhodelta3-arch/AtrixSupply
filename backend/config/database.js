import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function getConnection() {
    return pool.getConnection();
}

// CORREÇÃO: Adicionado o parâmetro 'params' padrão como array vazio
async function read(table, where = null, params = []) {
    const connection = await getConnection();
    try {
        let sql = `SELECT * FROM ${table}`;
        if (where) {
            sql += ` WHERE ${where}`;
        }

        // Agora enviamos os parâmetros de forma segura para o banco
        const [rows] = await connection.execute(sql, params);
        return rows;
    } finally {
        connection.release();
    }
}

// (Essa função já estava segura contra injeção de valores!)
async function create(table, data) {
    const connection = await getConnection();
    try {
        const columns = Object.keys(data).join(', ');
        const placeholders = Array(Object.keys(data).length).fill('?').join(', ');
        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        const values = Object.values(data);

        const [result] = await connection.execute(sql, values);
        return result.insertId;
    } finally {
        connection.release();
    }
}

// CORREÇÃO: Adicionado suporte a parâmetros no WHERE do Update
async function update(table, data, where, whereParams = []) {
    const connection = await getConnection();
    try {
        const set = Object.keys(data)
            .map(column => `${column} = ?`)
            .join(', ');

        const sql = `UPDATE ${table} SET ${set} WHERE ${where}`;
        const values = Object.values(data);

        // Junta os valores do SET com os valores do WHERE
        const [result] = await connection.execute(sql, [...values, ...whereParams]);
        return result.affectedRows;
    } finally {
        connection.release();
    }
}

// CORREÇÃO: Adicionado suporte a parâmetros no WHERE do Delete
async function deleteRecord(table, where, params = []) {
    const connection = await getConnection();
    try {
        const sql = `DELETE FROM ${table} WHERE ${where}`;
        const [result] = await connection.execute(sql, params);
        return result.affectedRows;
    } finally {
        connection.release();
    }
}

async function comparePassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Erro ao comparar senha:', error);
        return false;
    }
}

async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.error('Erro ao gerar hash da senha:', error);
        throw error;
    }
}

export { 
    create, 
    read, 
    update, 
    deleteRecord, 
    comparePassword, 
    hashPassword,
    getConnection
};