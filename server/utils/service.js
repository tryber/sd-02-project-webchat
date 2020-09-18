function getFields(data) {
  return Object.fromEntries(Object.entries(data).filter(([key, value]) => value && key !== 'id'));
}

function removePassword(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value && key !== 'password'),
  );
}

module.exports = {
  getFields,
  removePassword,
};
