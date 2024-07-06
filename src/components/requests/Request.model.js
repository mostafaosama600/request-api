const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    doctorName: {
      type: String,
    },
    patientName: {
      type: String,
    },
    patientID: {
      type: String,
    },
    doctorID: {
      type: String,
    },
    patientEmail: {
      type: String,
    },
    doctorEmail: {
      type: String,
    },
    phone: {
      type: String,
    },
    title: {
      type: String,
    },
    x: {
      type: String,
    },
    y: {
      type: String,
    },
    message: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

schema.post("init", (doc) => {
  doc.image = process.env.BASE_URL + "request/" + doc.image;
});

module.exports = model("request", schema);
