import express from "express"

import { getSummaryByUserId,createTransaction, deleteTransaction, getTransactionByUserId } from "../controllers/transactionsController.js"


const router = express.Router()

router.get("/:userId", getTransactionByUserId)
router.get("/summary/:userId", getSummaryByUserId)
router.post("/", createTransaction)
router.delete("/:id", deleteTransaction)




export default router