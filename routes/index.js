import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/index", (req, res, next) => {
    res.locals.filter = null;
    res.render("index");
});

router.get('/', (req, res, next) => {
    res.render('home');
});

export default router;
