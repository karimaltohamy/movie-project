import axios from "axios";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const apiKey = "42249950c00429dffd67fa4255daeebe"

const tmdbApi = {
    getMoviesList: (type, page= 1) => {
        const url = `https://api.themoviedb.org/3/movie/${movieType[type]}?api_key=${apiKey}&language=en-US&page=${page}`;
        return axios.get(url);
    },
    getTvList: (type, page=1) => {
        const url = `https://api.themoviedb.org/3/tv/${tvType[type]}?api_key=${apiKey}&language=en-US&page=${page}` ;
        return axios.get(url);
    },
    getVideos: (cate, id) => {
        const url = `https://api.themoviedb.org/3/${category[cate]}/${id}/videos?api_key=${apiKey}&language=en-US` ;
        return axios.get(url);
    },
    search: (cate, keyword, page= 1) => {
        const url = `https://api.themoviedb.org/3/search/${category[cate]}?api_key=${apiKey}&language=en-US&page=${page}&query=${keyword}`;
        return axios.get(url);
    },
    detail: (cate, id) => {
        const url = `https://api.themoviedb.org/3/${category[cate]}/${id}?api_key=${apiKey}&language=en-US` ;
        return axios.get(url);
    },
    credits: (cate, id) => {
        const url = `https://api.themoviedb.org/3/${category[cate]}/${id}/credits?api_key=${apiKey}&language=en-US`;
        return axios.get(url);
    },
    similar: (cate, id) => {
        const url = `https://api.themoviedb.org/3/${category[cate]}/${id}/similar?api_key=${apiKey}&language=en-US&page=1`;
        return axios.get(url);
    },
}

export default tmdbApi;
