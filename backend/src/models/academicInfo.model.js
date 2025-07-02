import mongoose from "mongoose";

const academicEntrySchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['High School', 'Intermediate', 'Graduation', 'Post-Graduation'],
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  yearOfPassing: {
    type: Number,
    required: true,
  },
  scoreType: {
    type: String,
    enum: ['Percentage', 'CGPA'],
    required: true,
  },
  marksObtained: {
    type: Number,
    required: function () {
      return this.scoreType === 'Percentage';
    },
  },
  maximumMarks: {
    type: Number,
    required: function () {
      return this.scoreType === 'Percentage';
    },
  },
  percentage: {
    type: Number,
    required: function () {
      return this.scoreType === 'Percentage';
    },
  },
  cgpa: {
    type: String,
    required: function () {
      return this.scoreType === 'CGPA';
    },
  },
});

const academicInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalInfo",
      required: true,
    },
    academicRecords: {
      type: [academicEntrySchema],
      validate: v => Array.isArray(v) && v.length > 0,
    },
  },
  { timestamps: true }
);

export const AcademicInfo = mongoose.model("AcademicInfo", academicInfoSchema);
