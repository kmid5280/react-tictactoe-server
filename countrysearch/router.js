const fetch = require('node-fetch');
const express = require('express')
const router = express.Router();
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search"
const {YOUTUBE_API_KEY} = require('../config')

router.get('/', (req, response) => {
    const query = req._parsedUrl.query
    const url = YOUTUBE_API_URL + "?q=" + query + "+facts" + "&key=" + YOUTUBE_API_KEY + "&part=snippet"
    fetch(url)
    .then(res => res.json())
    .then(json => response.status(200).json(json))
    .catch(err => res.status(500).json({message: 'Internal server error'}))
});

module.exports = {router};