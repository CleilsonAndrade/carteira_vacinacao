const crypto = require('crypto')

module.exports = {
  md5(str) {
    const md5 = crypto.createHash('md5')
    md5.update(str);
    return md5.digest('hex');
  },
  generate_key() {
    return crypto.randomBytes(16).toString('base64').replace(/\//g, '_').replace(/\+/g, '-')
  },
}