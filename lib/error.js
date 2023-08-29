import connect from './mongodb';
import Chicken from '../models/chicken';

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const formatChicken = async (body, method) => {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  const dateTimeFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  const chicken = {};
  // For the method post, we have to check if the name and the weight are provided
  if (method === 'post' && !body.name) {
    throw new ValidationError('A name is required');
  }
  if (method === 'post' && !body.weight) {
    throw new ValidationError('A weight is required');
  }

  if (body.name) {
    await connect();
    const check = await Chicken.findOne({ name: body.name });
    if (check) {
      throw new ValidationError('A chicken with this name already exists');
    }
    chicken.name = body.name;
  }
  if (body.hasOwnProperty('birthday')) {
    if (!dateFormat.test(body.birthday) && !dateTimeFormat.test(body.birthday)) {
      throw new ValidationError('Date format must be YYYY-MM-DD or YYYY-MM-DDTHH:mm');
    }
    chicken.birthday = body.birthday;
  }
  if (body.weight) {
    if (isNaN(body.weight)) {
      throw new ValidationError('The weight must be a number');
    }
    if (body.weight < 40) {
      throw new ValidationError('A chicken is at least 40 grams');
    }
    if (body.weight > 2200) {
      throw new ValidationError("A chicken can't be more 2200 grams");
    }
    chicken.weight = body.weight;
  }
  if (body.steps) {
    if (isNaN(body.steps)) {
      throw new ValidationError('The steps must be a number');
    }
    if (body.steps < 0) {
      throw new ValidationError("A chicken can't have negative steps");
    }
    chicken.steps = body.steps;
  }
  if (body.hasOwnProperty('isRunning')) {
    if (body.isRunning !== false && body.isRunning !== true) {
      throw new ValidationError('isRunning must be a boolean');
    }
    chicken.isRunning = body.isRunning;
  }
  return chicken;
};

export default formatChicken;
