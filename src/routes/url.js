import express from 'express';
import urlController from "../controllers/url.js"
const router = express.Router();


router.post('/createShortUrl', urlController.createShortUrl);
router.get('/getShortUrl', urlController.getUrls);
router.get('/getUrlByShortUrl/:shortUrl', urlController.getUrl );
router.get('/redirect/:shortUrl', urlController.redirectUrl);
router.put('/updateUrl/:shortUrl', urlController.updateUrl);
router.delete('/deleteUrl/:shortUrl', urlController.deleteUrl);
export default router;