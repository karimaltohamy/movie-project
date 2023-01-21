import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";

const CastList = (props) => {
  const { catalog } = useParams();

  const [casts, setCasts] = useState(null);

  useEffect(() => {
    const getCasts = async () => {
      const response = await tmdbApi.credits(catalog, props.id);

      setCasts(response.data.cast.slice(0, 4));
    };
    getCasts();
  }, [catalog, props.id]);

  return (
    <div className="casts_items">
      {casts &&
        casts.map((cast, i) => {
          return (
            <div className="cast_item" key={i}>
              <img src={apiConfig.w500Image(cast.profile_path)} alt="" />
              <span>{cast.name}</span>
            </div>
          );
        })}
    </div>
  );
};

export default CastList;
