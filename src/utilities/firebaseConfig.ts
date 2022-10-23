// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

const CORRECTIONS: Record<string, string> = {
    SCORES: 'scores',
};

const DOCUMENTS: Record<string, string> = {
    EASY: 'EASY_MODE',
    NORMAL: 'NORMAL_MODE',
    HARD: 'HARD_MODE',
};

const FIELDS: Record<string, string> = {
    SCORES: 'scores'
};

type ScoreObj = {
    score: number;
    username: string;
};

type ScoreListType = {
    scoreList: Array<ScoreObj>,
    difficulty: string;
    orderNum: number;
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    app,
    db,
    CORRECTIONS,
    DOCUMENTS,
    FIELDS
};

export type {
    ScoreObj,
    ScoreListType
};