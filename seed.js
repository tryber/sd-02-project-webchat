use webchat;

db.messages.insertMany([
  { nickname: 'admin', content: 'Boas vindas a todes', sentAt: new Date() },
  { nickname: 'admin', content: 'Conversem bastante', sentAt: new Date() },
]);
