import mongoose, { Schema } from 'mongoose';

const chickenSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    birthday: {
      type: Date,
    },
    steps: {
      type: Number,
      default: 0,
    },
    isRunning: {
      type: Boolean,
      default: false,
    },
  },
);

const Chicken = mongoose.models.Chicken || mongoose.model('Chicken', chickenSchema);

export default Chicken;
