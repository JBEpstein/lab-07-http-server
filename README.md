# Lab 7 Documentation

Begin running the server by typing 'npm start'. This will run a nodemon server that auto-refreshes. 

Create a .env file with a variable PORT=#### to change the default server port.

Server uses the following routes:

1. GET '/': Testing a plain GET request
2. GET '/cowsay': Attach a query string text=yourText and have cowsay repeat what you said.
3. POST '/api/cowsay': Send a message in the body of this POST question and have cowsaay say what you posted!

