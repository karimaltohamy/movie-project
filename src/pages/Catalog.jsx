import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { category } from '../api/tmdbApi'
import MovieGrid from '../components/movie-grid/MovieGrid'
import HeaderPage from '../components/header-page/HeaderPage'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

const Catalog = () => {
  const {catalog} = useParams()

  return (
    <>
    <Header/>
      <HeaderPage>
        {catalog === category.movie ? "Movies" : "TV Series"}
      </HeaderPage>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={catalog}/>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Catalog