import React, { useEffect, useRef, useState } from "react";

import apiConfig from "../../api/apiConfig";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Button, { ButtonOutLine } from "../button/Button";

import { useNavigate } from "react-router-dom";

import "./hero-slide.scss";
import Modal, { ModalContent } from "../modal/Modal";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular);
        setMovieItems(response.data.results.slice(1, 4));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="HeroSlide">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        grabCursor={true}
      >
        {movieItems.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <SliderItem item={item} className={isActive ? "active" : ""} />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

// slide swipper item
export const SliderItem = (props) => {
  const navigate = useNavigate();

  const background = apiConfig.originalImage(
    props.item.backdrop_path ? props.item.backdrop_path : props.item.poster_path
  );

  // function click to page details
  const onClick = () => {
    navigate(`movie/${props.item.id}`);
  };

  //   handle active modal
  const handleActiveModal = async () => {
    const modal = document.querySelector(`#modal_${props.item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, props.item.id);

    if (videos.data.results.length > 0) {
      const srcVideo =
        "https://www.youtube.com/embed/" + videos.data.results[0].key;

      modal
        .querySelector(".modal_content > iframe")
        .setAttribute("src", srcVideo);
    } else {
      modal.querySelector(".modal_content").innerHTML = "no Trialer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`slider_item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="slider_item_content container">
        <div className="slider_item_info">
          <h1 className="title">{props.item.title}</h1>
          <p className="overview">{props.item.overview}</p>
          <div className="btns">
            <Button onClick={onClick}>Watch Now</Button>
            <ButtonOutLine onClick={() => handleActiveModal()}>
              Watch Trailer
            </ButtonOutLine>
          </div>
        </div>
        <div className="slider_item_image">
          <img src={apiConfig.w500Image(props.item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

// model trailer
const TrailerModal = (props) => {
    const iframeRef = useRef(null);
  
    const onClose = () => iframeRef.current.setAttribute("src", "");
  
    return (
      <Modal active={false} id={`modal_${props.item.id}`}>
        <ModalContent onClose={onClose}>
          <iframe
            ref={iframeRef}
            width="100%"
            height="500px"
            title="trailer"
          ></iframe>
        </ModalContent>
      </Modal>
    );
  };

export default HeroSlide;
