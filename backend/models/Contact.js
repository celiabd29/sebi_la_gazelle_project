const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    prenom: String,
    nom: String,
    email: String,
    message: String,
    date_envoi: Date,
});


const DataContact = mongoose.model("Data", contactSchema); // s'assurez que le nom est "Data"
module.exports = DataContact;
