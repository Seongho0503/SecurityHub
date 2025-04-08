// db.ts 또는 main.ts
import mysql from 'mysql2/promise';

async function main() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'study',
    password: 'study123!',
    database: 'aws_db',
  });

  try {
    const [rows] = await connection.query('SELECT 1 + 1 AS solution');
    const result = rows as mysql.RowDataPacket[];
    console.log('The solution is:', result[0].solution);
  } catch (error) {
    console.error('쿼리 실행 중 오류 발생:', error);
  } finally {
    await connection.end();
  }
}

main();
