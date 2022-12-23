const LoginUserUseCase = require('../../../../Applications/use_case/LoginUserUseCase');
const LogoutUseCase = require('../../../../Applications/use_case/LogoutUseCase');
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/RefreshAuthenticationUseCase');

class AuthenticationHandler {
  constructor(container) {
    this._constainer = container;

    this.postAuthtenticationHandler = this.postAuthtenticationHandler.bind(this);
    this.putAuthtenticationHandler = this.putAuthtenticationHandler.bind(this);
    this.deleteAuthtenticationHandler = this.deleteAuthtenticationHandler.bind(this);
  }

  async postAuthtenticationHandler(request, h) {
    const loginUserUseCase = this._constainer.getInstance(LoginUserUseCase.name);
    const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);

    return response;
  }

  async putAuthtenticationHandler(request) {
    const refreshAuthenticationUseCase = this._constainer
      .getInstance(RefreshAuthenticationUseCase.name);
    const accessToken = await refreshAuthenticationUseCase.execute(request.payload);

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthtenticationHandler(request) {
    const logoutUserCase = this._constainer.getInstance(LogoutUseCase.name);
    await logoutUserCase.execute(request.payload);

    return {
      status: 'success',
    };
  }
}

module.exports = AuthenticationHandler;
