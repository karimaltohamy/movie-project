import React from "react";
import { Link } from "react-router-dom";
import { category, movieType } from "../api/tmdbApi";
import { ButtonOutLine } from "../components/button/Button";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";

const Home = () => {
  return (
    <>
    <Header/>
      <HeroSlide />
      <div className="section mb-3">
        <div className="section-header">
          <h2>Trending Movie</h2>
          <Link to="/movie">
            <ButtonOutLine>veiw more</ButtonOutLine>
          </Link>
        </div>
        <MovieList category={category.movie} type={movieType.popular} />
      </div>
      <div className="section mb-3">
        <div className="section-header">
          <h2>Top Rated Movie</h2>
          <Link to="/movie">
            <ButtonOutLine>veiw more</ButtonOutLine>
          </Link>
        </div>
        <MovieList category={category.movie} type={movieType.top_rated} />
      </div>
      <div className="section mb-3">
        <div className="section-header">
          <h2>popular Tv</h2>
          <Link to="/movie">
            <ButtonOutLine>veiw more</ButtonOutLine>
          </Link>
        </div>
        <MovieList category={category.tv} type={movieType.popular} />
      </div>
      <div className="section mb-3">
        <div className="section-header">
          <h2>Top Rated Tv</h2>
          <Link to="/movie">
            <ButtonOutLine>veiw more</ButtonOutLine>
          </Link>
        </div>
        <MovieList category={category.tv} type={movieType.top_rated} />
      </div>
      <Footer/>
    </>
  );
};

export default Home;
