import { NextResponse } from 'next/server';
import connect from '../../../../lib/mongodb';
import Chicken from '../../../../models/chicken';

// this route handler allows us to handle a PATCH request. It increments steps by 1 on EVERY single chicken
export async function PATCH() {
  try {
    await connect();
    await Chicken.updateMany({}, { $inc: { steps: 1 } });
    return NextResponse.json({ message: 'Chickens are updated' }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: 'something went wrong during updating chickens' }, { status: 401 });
  }
}
