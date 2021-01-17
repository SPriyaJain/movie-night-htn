import React, { useRef, useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Swiper from 'react-native-deck-swiper';
import { Text, View } from "react-native";

// const movies = [
//   {
//     "title": "Up",
//     "year": "2009",
//     "summary": "Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of balloons.",
//     "photo": 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Up_%282009_film%29.jpg/220px-Up_%282009_film%29.jpg',
//     "genres": ["Cartoon", "Adventure"]
//   },
//   {
//     "title": "Down",
//     "year": "2006",
//     "summary": "Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of balloons.",
//     "photo": 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Up_%282009_film%29.jpg/220px-Up_%282009_film%29.jpg',
//     "genres": ["Action", "Horror", "Family"]
//   }
// ];

export default function MovieGallery(props) {
  const [movies, setMovies] = useState(false);
  useEffect(() => {
    getMovies();
  }, []);
  function getMovies() {
    fetch('https://htn2020.appspot.com/movies')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setMovies(data.movies);
      });
  }

  const swiper = useRef();
  function swipeLeft() {
    swiper.current.swipeLeft();
  }
  function swipeRight() {
    swiper.current.swipeRight();
  }
  function swipeInternal(cardIndex, accept) {
    console.log("Index:", cardIndex, "Title:", movies[cardIndex].name, "Result:", accept)
    // fetch('http://localhost:3001/merchants', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({name, email}),
    // })
    //   .then(response => {
    //     console.log(response.text());
    //   });
  }
  function restart() {
    setMovies();
    getMovies();
  }

  return (
    <View>
      {movies && <Swiper
        ref={swiper}
        cards={movies}
        renderCard={(card) => {
          return (
            <MovieCard {...card} swipeLeft={swipeLeft} swipeRight={swipeRight} />
          )
        }}
        onSwipedLeft={(cardIndex) => swipeInternal(cardIndex, 0)}
        onSwipedRight={(cardIndex) => swipeInternal(cardIndex, 1)}
        onSwipedAll={() => restart()}
        stackSize= {3}
        verticalSwipe={false}>
      </Swiper>}
      {!movies && <Text>
        {'Loading...'}
      </Text>}
    </View>
  );
}
