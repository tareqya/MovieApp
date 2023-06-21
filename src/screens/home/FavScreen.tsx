import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import {
  ButtonView,
  Container,
  Stack,
  SwitchView,
  TextView,
} from "../../components";
import { COLORS, Images } from "../../../assets/styles";
import { MovieEntity } from "../../types";
import { fetchFavMovies, removeFavMovie } from "../../utils/DatabaseManager";
import AuthContext from "../../contexts/AuthContext";

const LABELS = [
  { value: "MOVIES", label: "Movies" },
  { value: "SERIES", label: "Series" },
];

const FavScreen = ({ navigation }: NativeStackHeaderProps) => {
  const { user } = React.useContext(AuthContext);

  const allMovies = React.useRef<MovieEntity[]>([]);

  const [movies, setMovies] = React.useState<MovieEntity[]>([]);

  // function to fetch all user favoriets movies list
  const fetchUserFavMovies = async () => {
    try {
      if (user) {
        const _movies = await fetchFavMovies(user.email);
        allMovies.current = _movies;
        setMovies(_movies.filter((m) => m.isMovie));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // function to filter movies and series related to the selected tab
  const handleOnTabChange = (value: string) => {
    if (value === "MOVIES") {
      setMovies(allMovies.current.filter((m) => m.isMovie));
    } else {
      setMovies(allMovies.current.filter((m) => !m.isMovie));
    }
  };

  // function to handle remove favorite movie from database and state
  const handleRemoveFavMovie = async (movie: MovieEntity) => {
    const res = await removeFavMovie(movie);
    if (!res) {
      alert("Faled to remove movie!");
    } else {
      setMovies((prev) => prev.filter((m) => m.id !== movie.id));
      allMovies.current = allMovies.current.filter((m) => m.id !== movie.id);
    }
  };

  React.useEffect(() => {
    fetchUserFavMovies();
  }, []);

  return (
    <Container>
      <SwitchView
        activeLabelColor={COLORS.text}
        activeLabelWrapperColor={COLORS.tomato}
        inactiveLabelColor={COLORS.text}
        style={{ backgroundColor: "rgb(45, 45,45)" }}
        initValue={LABELS[0].value}
        labels={LABELS}
        onChange={handleOnTabChange}
      />

      {movies.map((movie, index) => (
        <View key={index.toString()} style={{ marginVertical: 10 }}>
          <Stack direction="Horizontal" gap={10}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("MovieDetails", { movie })}
            >
              <Image
                source={!movie.image ? Images.DUMMY : { uri: movie.image }}
                resizeMethod="resize"
                resizeMode="stretch"
                style={{ width: 150, height: 200 }}
              />
            </TouchableOpacity>
            <Stack gap={10} style={{ flex: 1 }}>
              <TextView variant="bodyLarge">{movie.title}</TextView>
              <TextView variant="bodyLarge">{movie.description}</TextView>

              <ButtonView
                style={styles.removeBtn}
                onPress={() => handleRemoveFavMovie(movie)}
              >
                Remove
              </ButtonView>
            </Stack>
          </Stack>
        </View>
      ))}
    </Container>
  );
};

export default FavScreen;

const styles = StyleSheet.create({
  removeBtn: {
    width: 150,
    position: "absolute",
    bottom: 10,
    right: 0,
  },
});
