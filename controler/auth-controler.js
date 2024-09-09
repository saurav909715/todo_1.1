const User = require("../schima/userSchima")
const bcryptjs = require("bcryptjs")
const Todos = require("../schima/todoSchima")
const MSG = require("../schima/msgSchima")

const userMsg = async (req,res) => {
    const {name , email,text} = req.body
    const newMsg = await MSG.create({name,email,text})
    return res.json({newMsg})
}

const login = async (req,res) => {
    const {email, password} = req.body;
    // console.log(email,password)
    const isExist = await User.findOne({email})
    // console.log(isExist)
    if(!isExist){
        console.log("haha")
        return res.json({isExist : false})
    }
    const isMatch = await bcryptjs.compare(password, isExist.password)
    if(isMatch){
        res.json({
            isPassTrue : true,
            msg : "Login SuccesFully",
            token : await isExist.generateToken(),
            name : isExist.name,
            isExist : true
        })
    }else{
        res.json({isPassTrue : false , isExist : true })
    }
}

const reg = async (req,res) => {
    const {name,email, password} = req.body;
    const isExixt = await User.findOne({email})
    if(isExixt){
        return res.json({msg : "Email already exist",isExist : true})
    }
    const hashPass = await bcryptjs.hash(password,10)
    const newUser = await User.create({name : name,email : email, password : hashPass})
    return res.status(200).json({
        msg: "User registered successfully",
        token: await newUser.generateToken(),
        userId: newUser._id.toString(),
        name : newUser.name,
        status : true,
        isOk : true,
    });
}

const todos = async(req,res) => {
    // console.log(req.user.email)
    const email = req.user.email
    const todos = await Todos.find({email})
    // console.log(todos[1]._id)
    return res.json({todos})
}

const todosPost = async(req,res) => {
    const {text} = req.body
    const {email} = req.user
    const newTodo = await Todos.create({email:email,text : text})
    return res.json({newTodo})
}

const delTodo = async (req,res) => {
    const {id} = req.params
    const newM = await Todos.findByIdAndDelete(id)
    // console.log(id)
    return res.json({msg :newM})
}

const updateTodo = async(req,res) => {
        const id = req.params
        const {text} = req.body
        const newM = await Todos.findByIdAndUpdate(id.id,{text},{new:true})
        return res.json({msg : "hiii update"})
}


module.exports = {login,reg,todos,todosPost,delTodo,updateTodo,userMsg}