import {Api} from 'metronic-extension';

export default class extends Api {
  constructor() {
    super('/api/users');
  }

  async login(formData) {
    return this.client.post('login', formData);
  }

  async logout() {
    location.assign('/api/users/logout');
  }

  async createUser(formData) {
    return this.client.post('/', formData);
  }

  async getUser(userId) {
    return this.client.get(`/${userId}`);
  }

  async updateUser(userId, formData) {
    return this.client.put(`/${userId}`, formData);
  }

  async deleteUser(userId) {
    return this.client.delete(`/${userId}`);
  }

  async updateProfile(formData) {
    return this.client.put('/profile', formData);
  }
}