import express from "express";
import { validateToken } from '../auth/jwt.js'
import { getTagList, createTag, updateTag, deleteTag } from "../controllers/tag.controller.js"

const router = express.Router();

router.get('/:userId'/* , validateToken */, getTagList)
	.post('/:userId'/* , validateToken */, createTag)
	.patch('/:tagId'/* , validateToken */, updateTag)
	.delete('/:tagId'/* , validateToken */, deleteTag)

export default router