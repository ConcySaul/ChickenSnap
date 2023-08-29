import { NextResponse } from 'next/server';
import connect from '../../../../lib/mongodb';
import Chicken from '../../../../models/chicken';

export async function GET(request, { params }) {
  try {
    const { name } = params;
    await connect();
    const chickens = await Chicken.find({ name: { $regex: name, $options: 'i' } });
    return NextResponse.json({ chickens });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'something went wrong during updating chickens' }, { status: 401 });
  }
}
