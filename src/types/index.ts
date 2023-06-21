interface User {
  key?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

interface MovieIMDB {
  id: string;
  image: string;
  title: string;
  description: string;
  isMovie: boolean;
}

interface Movie extends MovieIMDB {
  favorite: boolean;
}

interface MovieEntity extends MovieIMDB {
  uid: string;
  key?: string;
}

export { User, Movie, MovieIMDB, MovieEntity };
