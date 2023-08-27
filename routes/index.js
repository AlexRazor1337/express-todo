import express from "express";
import db from "../db.js";
import authRouter from "./auth.js";

const router = express.Router();

router.get("/index", (req, res, next) => {
    res.locals.filter = null;
    res.render("index");
});

router.use("/", authRouter);

router.get('/', function(req, res, next) {

    if(!req.user) {return res.render('home');}
    next();

}, function(req, res, next) {
    res.locals.filter = null;
    res.render('index', {user: req.user});
});

export default router;
