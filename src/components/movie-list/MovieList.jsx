import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import tmdbApi, { category } from "../../api/tmdbApi";

import "./movie-list.scss";
import CardList from "../card-list/CardList";

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getMovieList = async () => {
      let response = null;

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type);
            break;
          default:
            response = await tmdbApi.getTvList(props.type);
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }

      setItems(response.data.results);
    };

    getMovieList();
  }, []);
  return (
    <div className="lists">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <CardList item={item} cate={props.category} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieList;
