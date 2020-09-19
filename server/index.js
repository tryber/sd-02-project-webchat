const { app, io } = require('./apps');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening messages on ${PORT}`));

io.listen(PORT, () => console.log(`Emitting events on ${PORT}`));
