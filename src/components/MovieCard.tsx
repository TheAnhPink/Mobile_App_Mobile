import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Movie = {
  id: string;
  title: string;
  rating: number;
  isShowing: boolean;
  genre: string;
  year: number;
  poster: string;
};

type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

const MovieCard = ({
  movie,
  layout = 'row',
  onSelect,
}: MovieCardProps) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      onPress={() => onSelect(movie.id)}
      style={[styles.card, isTile && styles.cardTile]}
    >
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
        />

        {isTile && (
          <Text style={styles.rating}>
            ⭐ {movie.rating.toFixed(1)}
          </Text>
        )}
      </View>

      <View style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={isTile ? 1 : undefined}
        >
          {movie.title}
        </Text>

        {!isTile && (
          <>
            <Text>{movie.genre}</Text>
            <Text>{movie.year}</Text>
            <Text>⭐ {movie.rating.toFixed(1)}</Text>
          </>
        )}

        <Text>
          {movie.isShowing ? '✅' : '❌'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
  },

  cardTile: {
    flex: 1,
    flexDirection: 'column',
  },

  posterContainer: {
    position: 'relative',
  },

  poster: {
    width: 70,
    height: 100,
  },

  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
  },

  info: {
    marginLeft: 10,
  },

  title: {
    fontWeight: 'bold',
  },

  rating: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: 'white',
    backgroundColor: 'black',
  },
});

export default React.memo(MovieCard);