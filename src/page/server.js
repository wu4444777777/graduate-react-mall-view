import {observable,action,runInAction} from 'mobx';
import axios from 'axios'

class API {
  // @observable
    @observable  state = {
        product: {},
        loginout: false
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

}

const api = new API();
export default api;