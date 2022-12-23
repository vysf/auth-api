const UserLogin = require('../../Domains/users/entities/UserLogin');
const NewAuthentication = require('../../Domains/authentication/entities/NewAuth');

class LoginUserUseCase {
  constructor({
    userRepository,
    passwordHash,
    authenticationRepository,
    authenticationTokenManager,
  }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payloadUseCase) {
    const { username, password: plainPassword } = new UserLogin(payloadUseCase);
    const encrypetedPassword = await this._userRepository.getPasswordByUsername(username);
    await this._passwordHash.comparePassword(plainPassword, encrypetedPassword);
    const id = await this._userRepository.getIdByUsername(username);
    const accessToken = await this._authenticationTokenManager
      .createAccessToken({ username, id });
    const refreshToken = await this._authenticationTokenManager
      .createRefreshToken({ username, id });

    // masukkan accessToken dan refreshToken ke entites
    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(refreshToken);

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
