import fetch from 'node-fetch';
const express = require('express')
const router = express.Router();
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search"
import YOUTUBE_API_KEY from '../config'

router.get('/', (req, response) => {
    const url = YOUTUBE_API_URL + "?key=" + YOUTUBE_API_KEY + "&part=snippet"
    fetch(url)
    .then(res => res.json())
    .then(json => response.status(200).json(json))
    .catch(err => res.status(500).json({message: 'Internal server error'}))
});

module.exports = {router};