import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { MovieEntity, User } from "../types";

const USERS_TABLE = "Users";
const FAVORITES_MOVIE_TABLE = "FAVORITES_MOVIE";

// function to create new user in firebase auth
const createAccount = async (user: User) => {
  try {
    await createUserWithEmailAndPassword(getAuth(), user.email, user.password!);
    delete user.password;
    const result = await saveUserInfo(user);
    if (!result) throw "Failed to save user data!";

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// function to save user info on firestore
const saveUserInfo = async (user: User) => {
  try {
    const userTableCollectionRef = collection(getFirestore(), USERS_TABLE);
    await addDoc(userTableCollectionRef, user);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// function to signin the user
const login = async (user: User) => {
  try {
    await signInWithEmailAndPassword(getAuth(), user.email, user.password!);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// function to fetch the user info from firestore
const fetchUserInfo = async (email: string) => {
  try {
    const userTableCollectionRef = collection(getFirestore(), USERS_TABLE);
    const q = query(userTableCollectionRef, where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.docs.length === 0) throw "User not found!";
    const user: User = {
      key: snapshot.docs[0].id,
      firstName: snapshot.docs[0].data().firstName,
      lastName: snapshot.docs[0].data().lastName,
      email: snapshot.docs[0].data().email,
    };

    return user;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

// function to logout user
const logout = async () => {
  try {
    await signOut(getAuth());
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// function to fetch the favoriets movies from firestore of spesific user
const fetchFavMovies = async (uid: string): Promise<MovieEntity[]> => {
  try {
    const favMoviesTableCollectionRef = collection(
      getFirestore(),
      FAVORITES_MOVIE_TABLE
    );
    const q = query(favMoviesTableCollectionRef, where("uid", "==", uid));
    const snapshot = await getDocs(q);
    const movies: MovieEntity[] = [];
    snapshot.docs.forEach((value) => {
      const movie: MovieEntity = {
        id: value.data().id,
        image: value.data().image,
        title: value.data().title,
        description: value.data().description,
        uid: uid,
        key: value.id,
        isMovie: value.data().isMovie,
      };

      movies.push(movie);
    });
    return movies;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// function to add new fav movie to user and return the id of it
const addFavMovie = async (movie: MovieEntity) => {
  try {
    const favMoviesTableCollectionRef = collection(
      getFirestore(),
      FAVORITES_MOVIE_TABLE
    );
    const res = await addDoc(favMoviesTableCollectionRef, movie);

    return res.id;
  } catch (err) {
    console.log(err);
    return "";
  }
};

// function to remove given movie from favoriets table in firestore
const removeFavMovie = async (movie: MovieEntity) => {
  try {
    const moveRef = doc(getFirestore(), FAVORITES_MOVIE_TABLE, movie.key!);
    await deleteDoc(moveRef);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export {
  createAccount,
  login,
  logout,
  fetchUserInfo,
  fetchFavMovies,
  addFavMovie,
  removeFavMovie,
};
