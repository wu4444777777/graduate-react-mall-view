import {observable,action,runInAction} from 'mobx';
import axios from 'axios'

class API {

    @observable state = {
        info: {},
        loginout: false
    }

    @action
    async getPageData() {
        let { data } = await axios.get('http://localhost:4530/page/getData');
        runInAction(() => {
            this.state.info = data;
            console.log("获取到的数据",data)
        })
        return data

    }

}

const api = new API();
export default api;