import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideosList from "./VideosList";
import apiConfig from "../../api/apiConfig";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import CastList from "./CastList";

import "./details.scss";
import MovieList from "../../components/movie-list/MovieList";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Detail = () => {
  const { catalog, id } = useParams();

  const [item, setItem] = useState();

  useEffect(() => {
    const itemDetails = async () => {
      const response = await tmdbApi.detail(catalog, id);

      setItem(response.data);
      window.scrollTo(0, 0);
    };

    itemDetails();
  }, [catalog, id]);

  return (
    <Fragment>
    <Header/>
      {item && (
        <Fragment>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path ? item.backdrop_path : item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie_content container">
            <div className="movie_content_poster">
              <img src={apiConfig.w500Image(item.poster_path)} alt="" />
            </div>
            <div className="movie_content_info">
              <h1 className="title">{item.title}</h1>
              <div className="genres">
                {item.genres.map((item, i) => (
                  <span className="item" key={i}>
                    {item.name}
                  </span>
                ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="casts">
                <h3>Casts</h3>
                <CastList id={id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section">
              <VideosList />
            </div>

            <div className="section mb-3">
              <MovieList category={catalog} type="similar" id={item.id} />
            </div>
          </div>
        </Fragment>
      )}
      <Footer/>
    </Fragment>
  );
};

export default Detail;
