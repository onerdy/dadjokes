// One-time migration: copies rows from the MySQL `joke` table into the
// Firestore `jokes` collection. Run locally with `npm run migrate`.
// Requires a local .env (see .env.example) and a Firebase service-account key.

import 'dotenv/config';
import mysql from 'mysql2/promise';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

interface JokeRow {
  id: number;
  Question: string;
  Answer: string;
}

async function main(): Promise<void> {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM joke');
  await connection.end();

  const jokeRows = rows as unknown as JokeRow[];
  console.log(`Read ${jokeRows.length} jokes from MySQL.`);

  const app = initializeApp({ credential: applicationDefault() });
  const db = getFirestore(app);

  let count = 0;
  for (const row of jokeRows) {
    await db
      .collection('jokes')
      .doc(String(row.id))
      .set({ question: row.Question, answer: row.Answer });
    count++;
  }

  console.log(`Wrote ${count} jokes to Firestore collection "jokes".`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
