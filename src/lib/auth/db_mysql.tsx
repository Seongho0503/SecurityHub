// db.ts 또는 main.ts
import mysql from 'mysql2/promise';

async function main() {
  const connection = await mysql.createConnection({
    host: 'jdbc:mysql://cmk-mysql.ctkjycl1blgv.ap-northeast-2.rds.amazonaws.com:3306',
    user: 'admin',
    password: 'Admin2025!',
    database: 'securityHub',
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
