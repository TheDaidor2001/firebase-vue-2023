import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router/index";

export const useUserStore = defineStore("user", {
  //Almacenar datos
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSesion: false
  }),

  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = {
          email: user.email,
          uid: user.uid,
        };
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      try {
        this.loadingUser = true;
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },

    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
              };
            } else {
              this.userData = null;
            }

            resolve(user);
          },
          (e) => reject(e)
        );

        unsuscribe();
      });
    },
  },
});
