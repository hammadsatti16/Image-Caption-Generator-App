import ApiService from "./apiService";

export default class UserService {
  static baseUrl = "/uploadapp";

  static async uploadFile(file: any): Promise<any> {
    return await ApiService.post<any>(this.baseUrl, file);
  }
}
