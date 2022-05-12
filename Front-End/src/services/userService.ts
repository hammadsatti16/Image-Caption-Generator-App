import ApiService from "./apiService";
import PostUserModel from "../models/postUserModel";
import PostResponseUserModel from "../models/postResponseUserModel";

export default class UserService {
  static baseUrl = "/login";

  static async loginUser(user: PostUserModel): Promise<PostResponseUserModel> {
    return await ApiService.post<PostResponseUserModel>(this.baseUrl, user);
  }
}
