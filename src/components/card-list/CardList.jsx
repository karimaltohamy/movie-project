import React from 'react'
import { Link } from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
import { category } from '../../api/tmdbApi'
import Button from '../button/Button'

import "./card-list.scss"

const CardList = (props) => {
    const item = props.item

    const bg = apiConfig.w500Image(item.poster_path ? item.poster_path :  item.backdrop_path)

    const link = "/"+ category[props.cate] + "/" + item.id

  return (
    <Link className='card_list' to={link} key={props.key}>
        <div className="card_content" style={{backgroundImage: `url(${bg})`}}>
            <Button className={"btn-card"}>
                <i className="bx bx-play"></i>
            </Button>
        </div>
        <div className="title_card">
            {item.title}
        </div>
    </Link>
  )
}

export default CardList