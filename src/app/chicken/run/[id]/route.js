import { NextResponse } from 'next/server';
import connect from '../../../../../lib/mongodb';
import Chicken from '../../../../../models/chicken';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    await connect();
    const chicken = await Chicken.findOne({ _id: id });
    if (!chicken) {
      return NextResponse.json({ message: 'No chicken found with provided id' }, { status: 401 });
    }
    const updatedChicken = await Chicken.findOneAndUpdate({ _id: id }, { $inc: { steps: 1 } }, { new: true });
    return NextResponse.json({ message: 'Chickens is updated', updatedChicken });
  } catch (e) {
    return NextResponse.json({ message: 'something went wrong during updating chickens' }, { status: 401 });
  }
}
