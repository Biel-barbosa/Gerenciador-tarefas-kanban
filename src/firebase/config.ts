import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1234567890abcdefghijklmnopqrstuvwxyz",
  authDomain: "gerenciador-tarefas.firebaseapp.com",
  projectId: "gerenciador-tarefas",
  storageBucket: "gerenciador-tarefas.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Inicialização do Firebase
let app: any;
let db: any;
let auth: any;

export const initializeFirebase = () => {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  return { app, db, auth };
};

// Obtém as instâncias do Firestore e Auth
export const getFirebaseDB = () => {
  if (!db) {
    const { db: database } = initializeFirebase();
    return database;
  }
  return db;
};

export const getFirebaseAuth = () => {
  if (!auth) {
    const { auth: authentication } = initializeFirebase();
    return authentication;
  }
  return auth;
};