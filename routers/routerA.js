const express = require("express")
const router = express.Router();
const {login,reg,todos,todosPost,delTodo,updateTodo,userMsg} = require("../controler/auth-controler")
const {authenticate} = require("../verification/todoVerify")

router.route("/login")
    .post(login)
router.route("/reg")
    .post(reg)
router.route("/todos")
    .get(authenticate,todos)

router.route("/todos/post")
    .post(authenticate,todosPost)

router.route("/todos/del/:id")
    .delete(authenticate,delTodo)

router.route("/todos/update/:id")
    .put(updateTodo)

router.route("/contactUs")
    .post(userMsg)

module.exports = router