const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avisSchema = new Schema({
    prenom: String,
    email: String,
    message: String,
    date_envoi: Date,
    note: Number,
});


const DataAvis = mongoose.model("DataAvis", avisSchema); // s'assurez que le nom est "Data"
module.exports = DataAvis;
