import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import Swiper from 'react-native-deck-swiper';

const movies = [
  {
    "title": "Up",
    "year": "2009",
    "summary": "Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of balloons.",
    "photo": 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Up_%282009_film%29.jpg/220px-Up_%282009_film%29.jpg',
    "genres": ["Cartoon", "Adventure"]
  },
  {
    "title": "Down",
    "year": "2006",
    "summary": "Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of balloons.",
    "photo": 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Up_%282009_film%29.jpg/220px-Up_%282009_film%29.jpg',
    "genres": ["Action", "Horror", "Family"]
  }
];

export default function MovieGallery(props) {
  const swiper = useRef();
  function swipeLeft() {
    swiper.current.swipeLeft();
    props.leftSwipe();
  }
  function swipeRight() {
    swiper.current.swipeRight();
    props.rightSwipe();
  }
  function swipeInternal(cardIndex, accept) {
    console.log("Index:", cardIndex, "Title:", movies[cardIndex].title, "Result:", accept)
  }

  return (
    <Swiper
      ref={swiper}
      cards={movies}
      renderCard={(card) => {
        return (
          <MovieCard {...card} swipeLeft={swipeLeft} swipeRight={swipeRight} />
        )
      }}
      onSwipedLeft={(cardIndex) => swipeInternal(cardIndex, 0)}
      onSwipedRight={(cardIndex) => swipeInternal(cardIndex, 1)}
      cardIndex={0}
      backgroundColor={'#4FD0E9'}
      stackSize= {3}
      verticalSwipe={false}>
    </Swiper>
  );
}
