const withImages = require('next-images');
require('dotenv').config({ path: `./.env.${process.env.ENVIRONMENT}` });
module.exports = {
    ...withImages(),
    trailingSlash: true,
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        CASINO_IMAGE_PLACEHOLDER: process.env.CASINO_IMAGE_PLACEHOLDER
    }
} 
