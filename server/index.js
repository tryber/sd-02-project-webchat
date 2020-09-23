const { app, io } = require('./apps');

const PORT_MESSAGE = process.env.PORT_MESSAGE || 3000;

const PORT_EVENT = process.env.PORT_EVENT || 3000;

app.listen(PORT_MESSAGE, () => console.log(`Receiving messages on ${PORT_MESSAGE}`));

io.listen(PORT_EVENT, () => console.log(`Emitting events on ${PORT_EVENT}`));
