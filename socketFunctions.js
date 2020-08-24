const historicoCallback = (socket, io) => (info) => {
  const { mensagensDB } = info;
  mensagensDB.forEach(({ name, messages }) => socket
    .emit(
      'historico',
      `${new Date(messages.postedAt).toLocaleString()} - ${name}: ${messages.content}`,
    ));
  const horarioLocale = new Date().toLocaleString();
  io.emit('novoUsuario', `${horarioLocale} - Bem vindo(a) ${info.nomeUsuario}`);
};

const mensagemChatCallback = (io) => ({ nomeUsuario, mensagemEnviada }) => {
  const horarioLocale = new Date().toLocaleString();
  const resposta = `${horarioLocale} - ${nomeUsuario}: ${mensagemEnviada}`;
  io.emit('mensagemChat', resposta);
  return resposta;
};

module.exports = {
  historicoCallback,
  mensagemChatCallback,
};
