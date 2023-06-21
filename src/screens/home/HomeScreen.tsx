import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React from "react";

import { SearchBar, Stack, TextView } from "../../components";
import { COLORS, Icons, Images, SIZES } from "../../../assets/styles";
import { Movie, MovieEntity } from "../../types";
import { ApiRequest } from "../../utils/ApiRequest";
import AuthContext from "../../contexts/AuthContext";
import {
  addFavMovie,
  fetchFavMovies,
  removeFavMovie,
} from "../../utils/DatabaseManager";
import { ActivityIndicator } from "react-native-paper";
import { API_KEY } from "../../utils/Constant";

const SERIES_SEARCH_URL = `https://imdb-api.com/en/API/SearchSeries/${API_KEY}`;
const MOVIES_SEARCH_URL = `https://imdb-api.com/en/API/SearchMovie/${API_KEY}`;

const HomeScreen = () => {
  const { user } = React.useContext(AuthContext);
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [favMovies, setFavMovies] = React.useState<MovieEntity[]>([]);
  const [loading, setLoading] = React.useState(false);

  // fetch movies that include 'search' from given api url
  const fetchData = async (url: string, search: string, isMovie: boolean) => {
    const _movies: Movie[] = [];
    try {
      const response = await ApiRequest({
        url: `${url}/${search}`,
        method: "GET",
      });

      const data = response.data.results;

      for (let item of data) {
        // loop on each movie and take the needed fields
        const movie: Movie = {
          id: item.id,
          image: item.image,
          title: item.title,
          description: item.description,
          favorite:
            favMovies.filter((m) => m.id === item.id && m.isMovie === isMovie)
              .length > 0,
          isMovie: isMovie,
        };
        _movies.push(movie);
      }
      console.log(_movies.length);
    } catch (err) {
      console.log(err);
    } finally {
      return _movies;
    }
  };

  // function to handle fetch searched movies and series
  const fetchSearchMovies = async (search: string) => {
    let _movies: Movie[] = [];
    let _series: Movie[] = [];

    try {
      setLoading(true);
      _movies = await fetchData(MOVIES_SEARCH_URL, search, true); // fetch movies
      _series = await fetchData(SERIES_SEARCH_URL, search, false); // fetch series
    } catch (err) {
      console.log(err);
    } finally {
      setMovies(_movies.concat(_series));
      setLoading(false);
    }
  };

  // function to fetch user favories movies
  const fetchUserFavMovies = async () => {
    try {
      if (user) {
        const _movies = await fetchFavMovies(user.email);
        setFavMovies(_movies);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // function to handle add or remove movie to favories list of user
  const handleFavPress = async (movie: Movie) => {
    let _movies = [...movies];
    _movies = _movies.map((value) =>
      value.id === movie.id && value.isMovie === movie.isMovie
        ? { ...value, favorite: !movie.favorite }
        : value
    );
    setMovies(_movies);
    if (movie.favorite) {
      //remove from fav
      setFavMovies(favMovies.filter((value) => value.id !== movie.id));
      const _movie: MovieEntity = favMovies.filter(
        (m) => m.id === movie.id && m.isMovie === movie.isMovie
      )[0];
      await removeFavMovie(_movie);
    } else {
      //add to fav
      const _movie: MovieEntity = {
        uid: user!.email,
        id: movie.id,
        image: movie.image,
        title: movie.title,
        description: movie.description,
        isMovie: movie.isMovie,
      };
      _movie.key = await addFavMovie(_movie);

      setFavMovies([...favMovies, _movie]);
    }
  };

  // function to search once user hit enter on keyboard
  const handleKeyPress = () => {
    setMovies([]);
    setSearchVisible(false);
    fetchSearchMovies(value);
  };

  React.useEffect(() => {
    fetchUserFavMovies();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <FlatList
        ListHeaderComponent={
          <View>
            {searchVisible ? (
              <SearchBar
                placeholder="Search..."
                onPress={() => setSearchVisible(false)}
                value={value}
                onChangeText={setValue}
                style={{ backgroundColor: "rgb(45,45,45)" }}
                inputStyle={{ color: COLORS.text }}
                placeholderTextColor={COLORS.text}
                iconColor={COLORS.text}
                returnKeyType="search"
                onSubmitEditing={handleKeyPress}
                autoCapitalize="none"
                autoCorrect={false}
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSearchVisible(true);
                  setValue("");
                }}
                style={styles.searchBtn}
              >
                <Icons.SearchIcon color="white" size={35} />
              </TouchableOpacity>
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={movies}
        numColumns={2}
        keyExtractor={(item, _) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.favBtn}
              activeOpacity={0.7}
              onPress={() => handleFavPress(item)}
            >
              <Icons.FavIcon
                color={item.favorite ? COLORS.tomato : COLORS.text}
                size={30}
              />
            </TouchableOpacity>
            <Image
              source={!item.image ? Images.DUMMY : { uri: item.image }}
              resizeMethod="resize"
              resizeMode="stretch"
              style={{ width: "100%", height: 200 }}
            />
            <TextView variant="bodyLarge">{item.title}</TextView>
          </View>
        )}
        ListEmptyComponent={
          loading == false ? (
            <Stack
              direction="Vertical"
              gap={5}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.EMPTY}
                style={{ aspectRatio: 1, height: SIZES.width }}
                resizeMode="contain"
              />
              <TextView variant="headlineMedium">No data found!</TextView>
            </Stack>
          ) : (
            <Stack
              direction="Vertical"
              gap={10}
              style={{ alignItems: "center" }}
            >
              <ActivityIndicator
                style={{ marginTop: SIZES.width / 2 }}
                size="large"
                color={COLORS.tomato}
              />
              <TextView variant="bodyLarge">Fetching movies...</TextView>
            </Stack>
          )
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 20,
  },
  searchBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    backgroundColor: "rgb(45,45,45)",
    paddingBottom: 10,
    borderRadius: 5,
  },
  favBtn: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
    left: 10,
    top: 5,
  },
});
