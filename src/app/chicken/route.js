import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connect from '../../../lib/mongodb';
import Chicken from '../../../models/chicken';
import { formatChicken } from '../../../lib/error';
// Since nextjs 13, we are able to create route handling by creating a route.js file inside the app directory.

// url : http://localhost:3000/api/chicken : this route handle the creation of a new chicken using POST method
export async function POST(request) {
  try {
    const body = await request.json();

    const chicken = await formatChicken(body, 'post');
    // we connect to our database using the function connect created before. (/chicken-finger-snap/lib/mongodb.js)
    await connect();
    // and we create our chicken using the chicken object
    await Chicken.create(chicken);
    return NextResponse.json({ message: 'Chicken created' }, { status: 201 });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return NextResponse.json({ message: e.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'POST FAILED' }, { status: 401 });
  }
}

export async function GET() {
  // just find every chicken and return them
  try {
    await connect();
    const chickens = await Chicken.find();
    return NextResponse.json(chickens, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: 'GET FAILED' }, { status: 401 });
  }
}

export async function DELETE(request) {
  try {
    // since it's a DELETE request, with have no body. But we provide data through the url. Here we are looking for the id of the chicken to check if it exists. If it doesn't we send a response with a custom message.
    const id = request.nextUrl.searchParams.get('id');
    await connect();
    // to find the chicken passing the id we got before. We also could use findByIdandDelete().
    const chicken = await Chicken.findOne({ _id: id });
    if (chicken == null) {
      return NextResponse.json({ message: `No Chicken found with id ${id}` }, { status: 401 });
    }
    await chicken.deleteOne({ _id: id });
    return NextResponse.json({ message: 'Chicken got deleted' }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: 'DELETE FAILED' }, { status: 401 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ message: 'MISSING ID' }, { status: 401 });
    }
    // cause we try to find an chicken by his id, but mongoDB is expecting an objectId while our id is a string;
    const objectId = new mongoose.Types.ObjectId(body.id);
    const existingChicken = await Chicken.findOne({ _id: objectId });
    // If the chicken is not in the database, we create one using POST
    if (!existingChicken) {
      return NextResponse.json({ message: 'No chicken found, use POST to create one' }, { status: 401 });
    }
    // PUT request updates the WHOLE ressource while PATCH PARTIALLY updates it. So we check if something is missing.
    if (!body.hasOwnProperty('name') || !body.hasOwnProperty('weight') || !body.hasOwnProperty('birthday') || !body.hasOwnProperty('steps') || !body.hasOwnProperty('isRunning')) {
      return NextResponse.json({ message: 'MISSING DATA, PUT update the WHOLE ressource' }, { status: 401 });
    }

    const formattedChicken = await formatChicken(body);
    await connect();
    const updatedChicken = await Chicken.findOneAndUpdate({ _id: body.id }, formattedChicken, { new: true });
    return NextResponse.json({ message: 'Chicken updated', updatedChicken }, { status: 201 });

  } catch (e) {
    if (e.name === 'ValidationError') {
      return NextResponse.json({ message: e.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'PUT FAILED' }, { status: 401 });
  }
}

export async function PATCH(request) {
  // update like PUT, but partially, which means you can update how many field you want
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ message: 'MISSING ID' }, { status: 401 });
    }
    const objectId = new mongoose.Types.ObjectId(body.id);
    const existingChicken = await Chicken.findOne({ _id: objectId });
    // If the chicken is not in the database, we create one using POST
    if (!existingChicken) {
      return NextResponse.json({ message: 'No chicken found, use POST to create one' }, { status: 401 });
    }
    // finally, we apply the patch
    const formattedChicken = await formatChicken(body);
    await connect();
    const updatedChicken = await Chicken.findOneAndUpdate({ _id: body.id }, formattedChicken, { new: true });
    return NextResponse.json({ message: 'PATCH SUCCEED', updatedChicken }, { status: 201 });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return NextResponse.json({ message: e.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'PATCH FAILED' }, { status: 401 });
  }
}
