/* eslint-disable no-undef */
const LogoutUseCase = require('../LogoutUseCase');
const AuthenticationRepository = require('../../../Domains/authentication/AuthenticationRepository');

describe('LogoutUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = {};
    const logoutUseCase = new LogoutUseCase({});

    // Action and Assert
    await expect(logoutUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });

  it('should throw error if refresht token not string', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 123,
    };

    const logoutUseCase = new LogoutUseCase({});

    // Action and Assert
    await expect(logoutUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 'refresh_token',
    };

    const mockAuthenticationRepository = new AuthenticationRepository();

    mockAuthenticationRepository.checkAvailabiltyToken = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockAuthenticationRepository.deleteToken = jest.fn()
      .mockImplementation(() => Promise.resolve);

    const logoutUseCase = new LogoutUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    // Action
    await logoutUseCase.execute(useCasePayload);

    // Assert
    expect(mockAuthenticationRepository.checkAvailabiltyToken)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
  });
});
