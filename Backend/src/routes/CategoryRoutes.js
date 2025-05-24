import express from "express"
import { deleteCategory, getAllCategories, postNewCategory, putUpdateCategory } from "../controllers/CategoryController.js"

const categoryRoute = express.Router()

categoryRoute.get("/", getAllCategories)
categoryRoute.post("/", postNewCategory)
categoryRoute.put("/:id", putUpdateCategory)
categoryRoute.delete("/:id", deleteCategory)

export default categoryRoute