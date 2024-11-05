import React from 'react';
import MovieGrid from './MovieGrid';

const MovieSection = ({ title, description, movies }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="mb-4">{description}</p>
    <MovieGrid movies={movies} />
  </section>
);

export default MovieSection;