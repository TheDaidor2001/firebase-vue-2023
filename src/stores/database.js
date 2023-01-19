import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from '../router/index.js'

export const useDatabaseStore = defineStore("dabase", {
  state: () => ({
    documents: [],
    loadingDocs: false,
  }),

  actions: {
    async getUrls() {
      if (this.documents.length !== 0) {
        return;
      }

      this.loadingDocs = true;
      try {
        const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDocs = false;
      }
    },
    async addUrl(name) {
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "urls"), objetoDoc);
        this.documents.push({
          ...objetoDoc,
          id: docRef.id,
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async leerUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("No existe el documento");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertence ese documento");
        }
        return docSnap.data().name;
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    },
    async updateUrl(id, name){
      try {
          const docRef = doc(db, "urls", id);
          const docSnap = await getDoc(docRef);
  
          if (!docSnap.exists()) {
            throw new Error("No existe el documento");
          }
  
          if (docSnap.data().user !== auth.currentUser.uid) {
            throw new Error("No le pertence ese documento");
          }

          await updateDoc(docRef, {
            name: name
          })

          this.documents = this.documents.map(item => item.id === id ? ({...item, name:name}) : item)
          router.push('/')
      } catch (error) {
        console.log(error.message);
      }finally{

      }
    },
    async deleteUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("No existe el documento");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertence ese documento");
        }

        await deleteDoc(docRef);
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  },
});
