const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?#?/;

const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  urlRegex,
  DB_ADDRESS,
};
