import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Not a secret - safe to commit (access is controlled by firestore.rules).
const firebaseConfig = {
  apiKey: 'AIzaSyArugzzNxidOoffAcAAzq8NAsn6_TdaF98',
  authDomain: 'dadjokes-onerdy-com.firebaseapp.com',
  projectId: 'dadjokes-onerdy-com',
  storageBucket: 'dadjokes-onerdy-com.firebasestorage.app',
  messagingSenderId: '477865986890',
  appId: '1:477865986890:web:03c5cdeb672d3320388fb3',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
