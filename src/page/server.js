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
      console.log("server",this.state)
    }

    @action
    async getPageData() {
        let { data } = await axios.get('http://localhost:4530/home/getData');
        runInAction(() => {
            this.state.product = data.data;
        })
        return data
    }

    @action
    async getDetailData(params) {
      let { data } = await axios.get('http://localhost:4530/detail/getDetail',params)

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

      return data.data
    }

    @action
    async saveProductRecord(params) {
      let { data } = await axios.post('http://localhost:4530/save/saveRecord',params)

      return data
    }

    @action
    async addIntoCart(params) {
      let { data } = await axios.post('http://localhost:4530/shoppingCart/addIntoCart',params)

      return data
    }

    @action
    async getCartList() {
      let { data } = await axios.get('http://localhost:4530/shoppingCart/getCartList')

      return data
    }

    @action 
    async deleteCartOne(params) {
      let { data } = await axios.get('http://localhost:4530/shoppingcart/deleteOne',params)
      
      return data
    }
}

const api = new API();
export default api;