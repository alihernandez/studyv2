const router = require("express").Router();

const users = require("./users")
const post = require("./post")
const newsfeed = require("./newsfeed")
const comments = require("./comments")
const profilePic = require("./profilePic")
const search = require("./search")

router.use("/post", post)
router.use("/newsfeed", newsfeed)
router.use("/users", users)
router.use("/comments", comments)
router.use("/profilePic", profilePic)
router.use("/search", search)


module.exports = router;
