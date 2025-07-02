import mongoose from "mongoose";
const subjectsInfoSchema = new mongoose.Schema({
    minorSubject:{
        type:[String]
    },
    majorSubject:{
        type:[String]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalInfo",
    },
},{timestamps:true})
export const Subjects = mongoose.model("Subjects",subjectsInfoSchema)