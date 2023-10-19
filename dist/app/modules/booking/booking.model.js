"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    tutor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Tutor",
    },
}, {
    timestamps: true,
});
/* ReviewSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}; */
exports.Booking = (0, mongoose_1.model)("Booking", BookingSchema);
