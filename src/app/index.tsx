import MovieCard from '@/components/MovieCard';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Switch,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

type Movie = {
  id: string;
  title: string;
  rating: number;
  isShowing: boolean;
  genre: string;
  year: number;
  poster: string;
};

function index() {
  const [movies, setMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const numColumns = isTile ? 2 : 1;

  const fetchMovies = async () => {
    try {
      const resp = await fetch(
        'https://6abb550db2118ed7abb84013.mockapi.io/movies'
      );

      const data = await resp.json();
      setMovie(data);
    } catch (err) {
      Alert.alert('Lỗi', 'Lỗi fetch');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMovies();
    setRefreshing(false);
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      await fetchMovies();
      setLoading(false);
    };

    loadMovies();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Movie App</Text>

          <Text>Dạng lưới</Text>

          <Switch
            value={isTile}
            onValueChange={setIsTile}
          />
        </View>

        <View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              key={String(numColumns)}
              data={movies}
              numColumns={numColumns}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={isTile ? { gap: 10 } : undefined}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              renderItem={({ item }) => (
                <MovieCard
                  movie={item}
                  layout={isTile ? 'tile' : 'row'}
                  onSelect={(id) => {
                    Alert.alert('Tên phim', item.title);
                  }}
                />
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default index;
