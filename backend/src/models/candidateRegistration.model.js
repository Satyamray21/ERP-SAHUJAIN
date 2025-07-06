import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const candidateRegistrationSchema =  new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    applicationId:{
        type:String,
        required:true,
        unique:true
    },
    verificationCode:{
        type:String,
        required:true
    },
    verificationExpiryTime:{
        type:Date

    },

},{timestamps:true})


function generateApplicationId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `Application_${randomNum}`;
}
candidateRegistrationSchema.pre("validate", async function (next) {
  if (!this.applicationId) {
    let newAppId;
    let existing;

    
    do {
      newAppId = generateApplicationId();
      existing = await mongoose.models.candidateRegistration.findOne({ applicationId: newAppId });
    } while (existing);

    this.applicationId = newAppId;
  }
  next();
});

candidateRegistrationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
export const CandidateRegistration =mongoose.model("candidateRegistration",candidateRegistrationSchema);
