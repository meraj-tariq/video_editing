import api from "./Api";
import { TFetchLoginDetailsPayload } from "../Store/Actions/Auth";
import CookiesService from "./Cookie";
// import LSService from "./LocalStorage";
import { User } from "./Url";
import environment from "../Config/Environment";

const { veegixUrl } = environment;

const Auth = {
  getAccessToken<R>() {
    return CookiesService.get<R>(CookiesService.TOKEN());
  },

  getAdminInfo<R>() {
    return CookiesService.get<R>(CookiesService.ADMIN());
  },

  isAuthenticated(): boolean {
    return this.getAccessToken() ? true : false;
  },

  loginService(payload: TFetchLoginDetailsPayload) {
    return api.Post(`${veegixUrl}${User.auth.LOGIN}`, payload);
  },

  userRegService(payload: TFetchLoginDetailsPayload) {
    return api.Post(`${veegixUrl}${User.user.REGISTER}`, payload);
  },

  getUserInfoService() {
    return api.Get(`${veegixUrl}/user`);
  },

  logOut(history: any) {
    // LSService.clear();
    localStorage.clear();
    // CookiesService.remove(CookiesService.TOKEN());
    CookiesService.remove(CookiesService.ADMIN());
    history.push({ pathname: "/" });
    window.location.reload();
  },
};
export default Auth;
