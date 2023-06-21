import { FlatList, Image, StyleSheet, View } from "react-native";
import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { Container, Stack, TextView } from "../../components";
import { Movie } from "../../types";
import { Images, SIZES } from "../../../assets/styles";
import { API_KEY } from "../../utils/Constant";
import { ApiRequest } from "../../utils/ApiRequest";

const MOVIE_DETAILS_URL = `https://imdb-api.com/en/API/FullCast/${API_KEY}`;
const MOVIE_WIKI_URL = `https://imdb-api.com/en/API/Wikipedia/${API_KEY}`;

interface MovieDetails extends Movie {
  summary: string;
  year: string;
  director: string;
  writer: string;
  actors: { name: string; image: string }[];
}

type MovieDetailsProps = NativeStackHeaderProps & {
  route: { params: { movie: Movie } };
};

const MovieDetails = ({ navigation, route }: MovieDetailsProps) => {
  const { movie } = route.params;

  const [loading, setLoading] = React.useState(false);
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails>();

  // function to fetch all movie details
  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      // fetch actors writer, and year of movie
      let response = await ApiRequest({
        url: `${MOVIE_DETAILS_URL}/${movie.id}`,
        method: "GET",
      });
      let data = response.data;
      const actors: { name: string; image: string }[] = [];
      const year = data.year;
      const director = data.directors.items[0].name;
      const writer = data.writers.items[0].name;
      for (let actor of data.actors) {
        actors.push({ name: actor.name, image: actor.image });
      }

      // fetch short of movie
      response = await ApiRequest({
        url: `${MOVIE_WIKI_URL}/${movie.id}`,
        method: "GET",
      });
      data = response.data;
      const summary = data.plotShort?.plainText;

      const _movieDetails: MovieDetails = {
        summary: summary,
        year: year,
        director: director,
        writer: writer,
        actors: actors,
        favorite: movie.favorite,
        id: movie.id,
        image: movie.image,
        title: movie.title,
        description: movie.description,
        isMovie: movie.isMovie,
      };

      setMovieDetails(_movieDetails);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (loading) return null;

  return (
    <Container goBack={() => navigation.goBack()}>
      <Stack gap={10} style={{ marginTop: 10 }}>
        <Image
          source={!movieDetails?.image ? Images.DUMMY : { uri: movie.image }}
          resizeMethod="resize"
          resizeMode="contain"
          style={{
            width: SIZES.width,
            height: SIZES.width / 1.5,
            alignSelf: "center",
          }}
        />
        <TextView variant="headlineSmall">{movieDetails?.title}</TextView>
        <TextView variant="headlineSmall">{movieDetails?.description}</TextView>

        <Stack direction="Horizontal" gap={10}>
          <TextView variant="bodyLarge">Writter:</TextView>
          <TextView variant="bodyLarge">{movieDetails?.writer}</TextView>
        </Stack>

        <Stack direction="Horizontal" gap={10}>
          <TextView variant="bodyLarge">Director:</TextView>
          <TextView variant="bodyLarge">{movieDetails?.director}</TextView>
        </Stack>

        <TextView variant="labelLarge">{movieDetails?.summary}</TextView>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={movieDetails?.actors || []}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Stack
              gap={10}
              style={{ flex: 1, alignItems: "center", marginHorizontal: 10 }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                }}
                resizeMethod="resize"
                resizeMode="center"
              />

              <TextView variant="bodyLarge">{item.name}</TextView>
            </Stack>
          )}
        />
      </Stack>
      <View style={{ marginTop: 100 }} />
    </Container>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
