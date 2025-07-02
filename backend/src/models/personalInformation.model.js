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
            unique:true
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
                address: {
                    type:String
                },
                city: {
                    type:String,
                    required:true,
                },
                state: {
                    type:String,
                    required:true,
                },
                pin: {
                    type:Number,
                    required:true
                }
            },
            temporaryAddress: {
                address: {
                    type:String,
                    required:true,
                },
                city: {
                    type:String,
                    required:true,
                },
                state: {
                    type:String,
                    required:true,
                },
                pin: {
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
                required:true,
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
            }
},
    {timestamps:true})

export const personalInfo = new mongoose.model("personalInfo",personalInfoSchema);