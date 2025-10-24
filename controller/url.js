const {nanoid} = require("nanoid")
const URL = require('../models/url')


async function handleGenerateShortUrl(req,res){
    const body = req.body;
    console.log(req.cookies.token);
    if(!body.url) return res.status(400).json({error:"url is required"})

    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[],
})

return res.json({id:shortID});
}

async function handleRedirect(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })
    res.redirect(entry.redirectURL);
}

async function getAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    res.json({
        totalclicks: result.visitHistory.length,
        Analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateShortUrl,handleRedirect,getAnalytics
}