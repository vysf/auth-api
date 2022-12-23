/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
class NewAuth {
  constructor(payload) {
    this._verifyPayload(payload);
    const { accessToken, refreshToken } = payload;

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyPayload(payload) {
    const { accessToken, refreshToken } = payload;

    if (!accessToken || !refreshToken) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewAuth;
