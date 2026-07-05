import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ROLE_VALUES } from "../constants/roles.js";

// 1. Create Schema
const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ROLE_VALUES,
      required: true,
    },

    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      default: null,
    },

    phone: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// 2. Middleware
staffSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 3. Instance Methods
staffSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

staffSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

// 4. Model
const Staff = mongoose.model("Staff", staffSchema);

// 5. Export
export default Staff;
