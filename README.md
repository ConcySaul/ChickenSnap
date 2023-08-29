## Getting Started

First, run the development server:

```bash
npm install next (if you don\'t have nextjs)
npm run start:all:dev (docker-compose up -d && npm run dev)
npm run build:start (docker-compose up -d && npm run build && npm run start)
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Check the api in the directory src/app/chicken

Here is the chicken object:
```c
{
    name: String (required),
    weight: Number (required),
    steps: Number (default : 0),
    birthday: Date,
    isRunning: Boolean (default: false)
}
```

GET -> http://localhost:3000/chicken : retrieve all the chickens.

GET -> http://localhost:3000/chicken/[name] : retrieve the chicken using the id passed in the URL. 

POST -> http://localhost:3000/chicken : create a new chicken, name and weight are required.

DELETE -> http://localhost:3000/chicken?id=exempleId15672 : delete a chicken passing the id in the URL. Replace exempleId15672 with a valid id.

PUT -> http://localhost:3000/chicken : Update the chicken. You need to provide every information AND the id.

PATCH -> http://localhost:3000/chicken : Update the chicken partially. You need to provide the id.

PATCH -> http://localhost:3000/chicken/run : Increment by 1 the field "steps" for every chicken.

PATCH -> http://localhost:3000/chicken/[id] : Increment by 1 the field "steps" for the chicken where id = [id].

