import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";

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
          console.log(doc.id, doc.data());
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
  },
});
