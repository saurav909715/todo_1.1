const {schima,model, Schema} = require("mongoose")

const msgSchima = new Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    text : {
        type : String,
    }
})

const MSG = model("MSG" , msgSchima)

module.exports = MSG;