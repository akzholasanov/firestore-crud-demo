import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyARkTpWb1saXXRm-PMO6tGZxnOhWMXXSVc',
  authDomain: 'tz-test-274ee.firebaseapp.com',
  projectId: 'tz-test-274ee',
  storageBucket: 'tz-test-274ee.firebasestorage.app',
  messagingSenderId: '993566663503',
  appId: '1:993566663503:web:a1e46b276f0f033c239b3a',
  measurementId: 'G-YZ1THL4D4Q',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
