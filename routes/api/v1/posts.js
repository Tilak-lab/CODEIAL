const express = require('express');
const posts_api=require("../../../controllers/api/v1/posts_api")

const router = express.Router();
router.get("/",posts_api.index)
router.get("/:id",posts_api.destroy) /// one mistake here u are using get method instead of delete


module.exports=router;