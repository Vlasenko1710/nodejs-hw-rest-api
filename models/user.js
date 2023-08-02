const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^[A-Za-z]\w{7,14}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
  }
);

userSchema.post("save", handleMongooseError);

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const validateSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
  subscription: Joi.string(),
});

const validateSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  validateSchema,
  validateSubscription,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
