import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface Joke {
  id: string;
  question: string;
  answer: string;
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function fetchAllJokesRandomized(): Promise<Joke[]> {
  const snapshot = await getDocs(collection(db, 'jokes'));
  const jokes = snapshot.docs.map((doc) => {
    const data = doc.data() as { question: string; answer: string };
    return { id: doc.id, question: data.question, answer: data.answer };
  });
  return shuffle(jokes);
}
