import urlModal from "../models/url.js";
const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).send({
                message: 'Original URL is required',
            });
        }

        const isUrlExist = await urlModal.findOne({ originalUrl });
        if (isUrlExist) {
            return res.status(400).send({
                message: "Original URL already shortened",
            });
        }

        const shortUrl = Math.random().toString(16).substring(2, 6);
        const newUrl = await urlModal.create({
            originalUrl,
            shortUrl,
        });

        return res.status(201).send({
            message: 'URL is shortened',
            newUrl,
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message || 'Internal Server Error',
            error,
        });
    }
};

const getUrls = async(req, res) => {
    try {
        const url = await urlModal.find({});
        res.status(200).send({
            message:'URL Fetched Successfully',
            url
        })
    } catch (error) {
        return res.status(500).send({
            message:error.message || 'Internal Server Error',
            error
        })
    }
}

const getUrl = async(req, res) => {
    try {
        const {shortUrl} = req.params;

        if(!shortUrl) {
            return res.status(400).send({
                message:'Short URL is Required'
            })
        }

        const url = await urlModal.findOne({shortUrl});

        if(!url){
            res.status(400).send({
                message:"URl not Found"
            })
        }
        res.status(200).send({
            message:"Short URL Fetched Successfully",
            url
        })
    } catch (error) {
        return res.status(500).send({
            message:error.message || 'Internal Server Error',
            error
        })
    }
}

const redirectUrl = async(req, res) => {
    try {
        const {shortUrl} = req.params;
        if(!shortUrl) {
            return res.status(400).send({
                message:'Short URL is Required'
            })
        }

        const url = await urlModal.findOne({shortUrl});
        if(!url){
           return res.status(400).send({
                message: 'URL not found'
            })
        }
        res.status(301).redirect(url.originalUrl)
    } catch (error) {
        res.status(500).send({
            message:error.message || 'Internal Server Error',
            error
        })
    }
}

const updateUrl = async(req, res) => {
    try {
        const {shortUrl} = req.params;
        const {originalUrl} = req.body;

        if(!shortUrl || !originalUrl){
            return res.status(400).send({
                message: 'shortUrl in route params and originalUrl in the request body is required'
            })
        }

        const url = await urlModal.findOneAndUpdate({shortUrl}, {originalUrl}, {new:true});
        console.log('url:', url)
        if(!url){
           return  res.status(404).send({
                message:'Url Not Found'
            })
        }
        res.status(200).send({
            message:"URL updated successfully",
            url
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || 'Internal Server Error',
            error
        })
    }
}

const deleteUrl = async(req, res) => {
    try {
        const {shortUrl} = req.params;
        if(!shortUrl) {
            return res.status(400).send({
                message:'Short URL is Required'
            })
        }
        const deleteUrl = await urlModal.findOneAndDelete({shortUrl});

        if(!deleteUrl) {
            return res.status(404).send({
                message: "URL not found"
            })
        }
        res.status(200).send({
            message:'Url successfully deleted'
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}
export default {
    createShortUrl,
    getUrls,
    getUrl,
    redirectUrl,
    updateUrl,
    deleteUrl
}