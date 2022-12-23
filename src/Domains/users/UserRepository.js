/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * UserRepository merupakan objek yang memiliki kumpulan
 * fungsi, di mana fungsi tersebut digunakan untuk berinteraksi
 * dengan database (agen eksternal) dalam cakupan domain users.
 *
 * kemampuan atau fungsi UserRepository di sini bersifat abstrak.
 * Sehingga, kita tidak akan menulis cara menyimpan user baru
 * ke database atau memverifikasi keunikan username dari database,
 * tetapi cukup mendefinisikan fungsi-fungsinya saja.
 */
class UserRepository {
  /**
   * digunakan untuk menyimpan user baru ke database
   * @param {object} registerUser objek register user
   */
  async addUser(registerUser) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * digunakan untuk memeriksa keunikan username baru dari database
   * @param {string} username username
   */
  async verifyAvailableUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getPasswordByUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getIdByUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = UserRepository;
