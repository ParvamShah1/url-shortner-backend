const express = require("express")
const {handleGenerateShortUrl,handleRedirect, getAnalytics} = require("../controller/url")
const router = express.Router();
const {isAuth} = require("../middleware/isAuth")


router.post("/", isAuth, handleGenerateShortUrl)
router.get("/:shortId", handleRedirect)
router.get("/analytics/:shortId", isAuth, getAnalytics)
module.exports = router;