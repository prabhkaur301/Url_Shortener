const express = require('express');
const router= express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid')
const config= require('config');
const Url= require('../models/Url');

// @Routes POST request /api/url/shorten
router.post('/shorten',  async (req,res)=>{
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url');
    }

    //create url code
   const urlCode = shortid.generate() ;

   //check long url
   if(validUrl.isUri(longUrl)){
        try {
            let url= await Url.findOne({ longUrl });
            // url is already available in db
            if(url){
                res.json(url);
            }
            //if url is not available in db, we will add new url in db with all its details
            else{
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }

        } 
        catch (error) {
            console.log(error);
            res.status(500).json('Server error');
        }
   }

   else{
    res.status(401).json('Invalid long Url');
   }


})

module.exports = router;