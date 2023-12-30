"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tutor_constant_1 = require("../tutor/tutor.constant");
const bookingSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tutorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tutor',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: tutor_constant_1.statusInfo,
        default: 'request',
    },
    teachingStartDate: {
        type: Date,
        required: true,
    },
    message: {
        dayPerWeek: {
            type: Number,
            required: true,
        },
        teachingTime: {
            type: String,
            required: true,
        },
        maxSalary: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
}, {
    timestamps: true,
});
const Booking = (0, mongoose_1.model)('Booking', bookingSchema);
exports.default = Booking;
