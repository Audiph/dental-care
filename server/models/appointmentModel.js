import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const appointmentSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    dentistId: {
      type: String,
      required: true,
    },
    dentistInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model('appointments', appointmentSchema);

export default appointmentModel;
