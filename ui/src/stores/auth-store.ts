import { defineStore } from 'pinia';
import { tokenClear, tokenSave } from '@/services/token-storage';
import { Themes } from '@/plugin/vuetify/Themes';
import { LogInRequest, logIn } from '@/services/auth-api/login';
import { checkLogin } from '@/services/auth-api/check-login';
import router from '@/router';
import { useReCaptcha } from 'vue-recaptcha-v3';
  
export const useAuthStore = defineStore('useAuthStore', {
  state: () => {
    return {
        theme: Themes.Light,
        isLogged: false,
        recaptchaHandler: useReCaptcha()  
    }
  },
  actions: {
    toggleTheme() {
        this.theme = this.theme === Themes.Light ? Themes.Dark : Themes.Light;
    },
    async checkLogin() {
      try {
        await checkLogin();
        this.isLogged = true;
        return Promise.resolve();
      } catch(err) {
        this.logout();
        return Promise.reject();
      }
    },
    async login(payload: LogInRequest, reCaptchToken: string) {
      const { data } = await logIn(payload, reCaptchToken);
      tokenSave(data.token);
      this.isLogged = true;
      
      router.push('/');
    },
    async getRecaptchaToken(action: string): Promise<string> {
      try {
        await this.recaptchaHandler?.recaptchaLoaded();
        const token = await this.recaptchaHandler?.executeRecaptcha(action);
        
        if (!token) {
          return Promise.reject("");
        }

        return Promise.resolve(token);
      } catch(err) {
        return Promise.reject("");
      }
    },
    logout() {
      tokenClear();
      this.isLogged = false;
      this.theme = Themes.Light;

      router.push('/login');
    }
  },
})