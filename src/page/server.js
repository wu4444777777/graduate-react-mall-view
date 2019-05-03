import {observable,action,runInAction} from 'mobx';
import axios from 'axios'

class API {
  // @observable
    @observable  state = {
        product: {},
        loginout: false,
        formData: {

        },
        orderList: []
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
    async getCartList(params) {
      let { data } = await axios.get('http://localhost:4530/shoppingCart/getCartList',params)

      return data
    }

    @action 
    async deleteCartOne(params) {
      let { data } = await axios.get('http://localhost:4530/shoppingcart/deleteOne',params)
      
      return data
    }

    @action
    async getClassifyList(params) {
      let { data } = await axios.get('http://localhost:4530/classify/classifyList',params)
      return data
    }

    @action
    async sendOrderList(params) {
      let { data } = await axios.post('http://localhost:4530/order/insertOrderList',params) 
      return data
    }

    @action
    async getOrderList(params){
      let { data } = await axios.get('http://localhost:4530/order/getOrderList',params)

      runInAction(()=>{
        this.state.orderList = data.data 
      })
      return data
    }

    @action
    async searchOrder(params){
      let { data } = await axios.get('http://localhost:4530/order/searchOrder',params)

      return data
    }

    @action
    async getSaveList() {
      let { data } = await axios.get('http://localhost:4530/save/getSaveList')

      return data
    }

    @action
    async deleteSaveProduct(params) {
      let { data } = await axios.get('http://localhost:4530/save/deleteSaveOne',params)

      return data
    }

    @action
    async sendSearchProduct(params) {
      let { data } = await axios.get('http://localhost:4530/search/searchProduct',params) 

      return data
    }

    @action
    async deleteMore(params) {
      let { data } = await axios.get('http://localhost:4530/shoppingCart/deleteLots',params)

      return data
    }

    @action
    async addAddress(params) {
      let { data } = await axios.post('http://localhost:4530/address/addORupdateAddress',params)
      
      return data
    }

    @action
    async getAddress(params){
      let { data } = await axios.get('http://localhost:4530/address/getAddress',params)

      return data
    }

    @action
    async getAddressList(params){
      let { data } = await axios.get('http://localhost:4530/address/getAddressList',params)

      return data
    }

    @action
    async deleteAddress(params){
      let { data } = await axios.get("http://localhost:4530/address/deleteAddress",params)

      return data
    }

    @action
    async getPriorAddress(params){
      let { data } = await axios.get('http://localhost:4530/address/getPriorAddress',params)

      return data
    }

    @action
    async getUserAddress(params){
      let { data } = await axios.get('http://localhost:4530/address/getUserAddress',params)

      return data
    }

    @action
    async updateUserInfo(params){
      let { data } = await axios.post('http://localhost:4530/user/updateUserInfo',params)

      return data
    }

    @action
    async setOrderStatus(params){
      let { data } = await axios.post('http://localhost:4530/order/setOrderStatus',params)
      return data
    }

    @action
    async updateCartNum(params){
      let { data } = await axios.get('http://localhost:4530/shoppingCart/updateCartNum',params)
      return data
    }
}

const api = new API();
export default api;