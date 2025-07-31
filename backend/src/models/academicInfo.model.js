import mongoose from "mongoose";

const academicEntrySchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['High School', 'Intermediate', 'Graduation', 'Post-Graduation'],
    required: true,
  },
  board: {
    type: String,
    required: function () {
      return this.level !== 'Graduation'; // Not required for Graduation
    },
  },
  subject: {
    type: String,
    required: function () {
      return this.level !== 'Graduation'; // Not required for Graduation
    },
  },
  yearOfPassing: {
    type: Number,
    required: function () {
      return this.level !== 'Graduation';
    },
  },
  scoreType: {
    type: String,
    enum: ['Percentage', 'CGPA'],
    required: function () {
      return this.level !== 'Graduation';
    },
  },
  marksObtained: {
    type: Number,
    required: function () {
      return this.scoreType === 'Percentage' && this.level !== 'Graduation';
    },
  },
  maximumMarks: {
    type: Number,
    required: function () {
      return this.scoreType === 'Percentage' && this.level !== 'Graduation';
    },
  },
  percentage: {
    type: Number,
    required: function () {
      return this.scoreType === 'Percentage' && this.level !== 'Graduation';
    },
  },
  cgpa: {
    type: String,
    required: function () {
      return this.scoreType === 'CGPA' && this.level !== 'Graduation';
    },
  },
  applicationId: {
    type: String,
    required: true,
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
