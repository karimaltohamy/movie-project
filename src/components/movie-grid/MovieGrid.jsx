import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { ButtonOutLine } from "../button/Button";
import CardList from "../card-list/CardList";
import Input from "../input/Input";

import "./movie-grid.scss";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(1);

  const { keyword } = useParams();

  useEffect(() => {
    const getMovieGrid = async () => {
      let response = null;

      if (keyword === undefined) {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming);
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular);
        }
      } else {
        response = await tmdbApi.search(props.category, keyword);
      }

      setItems(response.data.results);
      setTotalPage(response.data.total_pages);
    };

    getMovieGrid();
  }, [props.category, keyword]);

  const handleReadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, page + 1);
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, page + 1);
      }
    } else {
      response = await tmdbApi.search(props.category, keyword, page + 1);
      
    }

    console.log(response.data);
    setItems([...items, ...response.data.results]);
    setPage(page + 1);
  };

  return (
    <Fragment>
      <div className="movie_search mb-2">
        <MovieSearch keyword={keyword} category={props.category} />
      </div>

      <div className="movie-grid">
        {items.map((item, i) => (
          <CardList cate={props.category} item={item} key={i} />
        ))}
      </div>

      {totalPage > page && (
        <div className="container_btn">
          <ButtonOutLine onClick={handleReadMore}>Read More</ButtonOutLine>
        </div>
      )}
    </Fragment>
  );
};

const MovieSearch = (props) => {
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const navigate = useNavigate();

  const gorToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
    }
  }, [props.category, keyword, navigate]);

  useEffect(() => {
    const handleEvent = (e) => {
      e.preventDefault();

      if (e.keyCode === 13) {
        gorToSearch();
      }
    };
    document.addEventListener("keyup", (e) => handleEvent(e));

    return () => {
      document.removeEventListener("keyup", (e) => handleEvent(e));
    };
  }, [keyword, gorToSearch]);

  return (
    <>
      <Input
        type={"text"}
        placeholder={"search here..."}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={gorToSearch}>search</Button>
    </>
  );
};

export default MovieGrid;
