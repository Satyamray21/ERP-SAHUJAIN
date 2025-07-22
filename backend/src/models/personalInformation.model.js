import mongoose from "mongoose";
const  personalInfoSchema = new mongoose.Schema({
       
        firstName:{
            type:String,
            required:true
        } ,
         middleName: {
            type:String,
            
         },
            lastName: {
            type:String,
            required:true,
            
         },
            email:{
            type:String,
            required:true,
            unique:true,
        } ,
            mobileNumber: {
            type:Number,
            required:true,
            unique:true
        } ,
            whatsappNumber:{
            type:Number,
            required:true,
            unique:true,
        } ,
            dob: {
            type:String,
            required:true,
            
        } ,
            gender: {
                type:String,
                enum:['Male', 'Female', 'Other'],
            },
            nationality: {
                type:String,
                enum:['Indian', 'Other'],
            },
            caste: {
                type:String,
                enum:['General', 'OBC', 'SC', 'ST']
            },
            specialCategory:{
                type:String,
                enum: ['None', 'PWD', 'EWS', 'Ex-Serviceman']
            },
            religion:{
                type:String,
                enum:['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other']
            },
            aadharNumber:{
                type:Number,
                required:true,
                unique:true,
            },
            voterId:{
                type:String,
                unique:true,
            },
            weightageClaimed:{
                type:String,
                enum:['Yes', 'No']
            },
            permanentAddress: {
                Paddress: {
                    type:String
                },
                Pcity: {
                    type:String,
                    required:true,
                },
                Pstate: {
                    type:String,
                    required:true,
                },
                Ppin: {
                    type:Number,
                    required:true
                }
            },
            temporaryAddress: {
                Taddress: {
                    type:String,
                    required:true,
                },
                Tcity: {
                    type:String,
                    required:true,
                },
                Tstate: {
                    type:String,
                    required:true,
                },
                Tpin: {
                    type:Number,
                    required:true,
                },
            },
            fathersName: {
                    type:String,
                    required:true,
                },
            mothersName: {
                    type:String,
                    required:true,
                },
            parentsMobile: {
                    type:String,
                    required:true,
                },
            verificationCode:{
                type:String,
                
            },
            verificationCodeExpiry:{
                type:Date,
            },
            candidate_photo:{
                type:String,
                required:true,
            },
            candidate_signature:{
                type:String,
                required:String
            },
            applicationId: {
            type: String,
            required: true,
            }

},
    {timestamps:true})

export const personalInfo = new mongoose.model("personalInfo",personalInfoSchema);