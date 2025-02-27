const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    prenom :{
        String, 
        required: [true, "Le prénom est obligatoire"],
        minlength: [2, "Le prénom doit contenir au moins 2 caractères"],
        maxlength: [75, "Le prénom doit contenir au maximum 75 caractères"],
    },
    nom: {
        String,
        required: [true, "Le nom est obligatoire"],
        minlength: [2, "Le nom doit contenir au moins 2 caractères"],
        maxlength: [75, "Le nom doit contenir au maximum 75 caractères"],
    },
    email: {
        String,
        required: [true, "L'email est obligatoire"],
        minlength: [5, "L'email doit contenir au moins 5 caractères"],
        maxlength: [100, "L'email doit contenir au maximum 100 caractères"],
    },
    message: {
        String,
        required: [true, "Le message est obligatoire"],
        minlength: [5, "Le message doit contenir au moins 5 caractères"],
        maxlength: [500, "Le message doit contenir au maximum 500 caractères"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


const DataContact = mongoose.model("Data", contactSchema); // s'assurez que le nom est "Data"
module.exports = DataContact;
