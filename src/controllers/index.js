const path = require('path');

const publicFolder = path.join(__dirname, '../..', 'public');
const homePage = `${publicFolder}/index.html`;
const css = `${publicFolder}/style.css`;

const sendHomePage = (req, res) => res.sendFile(homePage);
const sendCss = (req, res) => res.sendFile(css);

module.exports = { sendHomePage, sendCss };
