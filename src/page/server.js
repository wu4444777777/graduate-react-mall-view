import {observable,action,runInAction} from 'mobx';
import axios from 'axios'

class API {
  // @observable
    @observable  state = {
        product: {},
        loginout: false,
        formData: {

        }
    }

    // 储存数据
    @action
    setStoreData(name,data) {
      this.state[name] = data
    }

    @action
    async getPageData() {
        let { data } = await axios.get('http://localhost:4530/page/getData');
        runInAction(() => {
            this.state.product = data.data;
        })
        return data
    }

    @action
    async getDetailData(params) {
      let { data } = await axios.get('http://localhost:4530/page/sendDetail',params)

      return data
    }

    @action
    async setRegisterData(params) {
      let { data } = await axios.post('http://localhost:4530/user/register',params)

      return data
    }

    @action
    async setLoginData(params) {
      let { data } = await axios.post('http://localhost:4530/user/login',params)

      return data
    }

    @action
    async getUserInfo(params) {
      let { data } = await axios.get('http://localhost:4530/user/getUserInfo',params) 

      console.log(data)
      return data.data
    }
}

const api = new API();
export default api;