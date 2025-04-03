import { create } from 'zustand';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../app/firebase-config';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

interface UserStore {
  users: User[];
  user: User | null;
  loading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, updatedUser: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
}

export const useUserStore = create<UserStore>(set => ({
  users: [],
  user: null,
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map(
        doc => ({ id: doc.id, ...doc.data() } as User),
      );
      console.log('User found:', users);
      set({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchUserById: async (id: string) => {
    set({ loading: true });
    try {
      const userRef = doc(db, 'users', id);
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const user = { id: docSnapshot.id, ...docSnapshot.data() } as User;
        set({ user });
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      set({ loading: false });
    }
  },

  addUser: async user => {
    try {
      const docRef = await addDoc(collection(db, 'users'), user);
      set(state => ({ users: [...state.users, { id: docRef.id, ...user }] }));
    } catch (error) {
      console.error('Error adding user:', error);
    }
  },

  updateUser: async (id, updatedUser) => {
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, updatedUser);
      set(state => ({
        users: state.users.map(user =>
          user.id === id ? { ...user, ...updatedUser } : user,
        ),
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },

  deleteUser: async id => {
    try {
      await deleteDoc(doc(db, 'users', id));
      set(state => ({
        users: state.users.filter(user => user.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  },
}));
