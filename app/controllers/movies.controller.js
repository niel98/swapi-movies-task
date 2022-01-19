const axios = require('axios')
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const db = require("../models")

const getMovies = asyncHandler(async(req, res) => {
    const url = process.env.URL

    const movieResults = await axios.get(url)

    const comments = await db.Comment.findAll({ attributes: ['comment', 'movie_id']})

    const result = movieResults.data.results.map(movie =>{ 
        let commentIds = comments.filter(comment => comment.movie_id == movie.url.split('/')[5])

        return {title: movie.title, 
        opening_crawl: movie.opening_crawl, 
        release_date: movie.release_date,
        url: movie.url,
        comments: commentIds,
        comment_count: commentIds.length
    }})

    console.log('Results: ', result)

    res.status(200).send({
        movies: result.sort(result.release_date)
    })
})

module.exports = { getMovies }