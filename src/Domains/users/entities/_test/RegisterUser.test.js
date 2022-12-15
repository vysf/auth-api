/* eslint-disable no-undef */
const RegisterUser = require('../RegisterUser');

describe('a RegisterUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrage
    const payload = {
      username: 'abc',
      password: 'abc',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrage
    const payload = {
      username: 123,
      fullname: true,
      password: 'abc',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username contains more then 50 characters', () => {
    // Arrage
    const payload = {
      username: 'dicodingdicodingdicodingdicodingdicodingdicodingdicoding',
      fullname: 'Dicoding Indonesi',
      password: 'abc',
    };

    // Action and Asserd
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username constains restricted character', () => {
    // Arrage
    const payload = {
      username: 'dico ding',
      fullname: 'Dicoding Indonesia',
      password: 'abc',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should create registerUser object correctly', () => {
    // Arrage
    const payload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesi',
      password: 'abc',
    };

    // Action
    const { username, password, fullname } = new RegisterUser(payload);

    // Assert
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
    expect(password).toEqual(payload.password);
  });
});
