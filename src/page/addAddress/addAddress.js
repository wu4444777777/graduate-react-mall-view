import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, List, Toast, InputItem, TextareaItem, Switch  } from 'antd-mobile';
import { createForm } from 'rc-form';
import api from '../server'
import util from '../../utils/index'
import AddressPicker from '../common/addressPicker/AddressPickerView'
import './addAddress.less'

@observer
class addressManage extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      checked: false,
      selectedArea: "",
      addressDetail: {},
      province: "",
      city: "",
      district: ""
    }
    this.id = util.handleQueryUrl("id")
  }

  componentWillMount() {
    let { selectedArea } = this.state
    if(this.id){
      api.getAddress({
        params: {
          id: this.id
        }
      }).then(data => {
        console.log("data",data)
        let item = data.data[0]
        if(item.province == item.city){
          selectedArea = item.city + item.district
        }else{
          selectedArea = item.province + item.city + item.district
        }
        this.setState({
          addressDetail: item,
          selectedArea,
          province: item.province,
          city: item.city,
          district: item.district,
        })
        if(data.data[0].prior ==1){
          this.setState({
            checked: true
          })
        }else{
          this.setState({
            checked: false
          })
        }
      })
    }
  }

  save(val) {
    Toast.loading("Loading...",999)
    let { checked, province, city, district } = this.state
    let prior = 0
    let addressId = 0
    if(checked == true) {
      prior = 1
    }else{
      prior = 0
    }
    if(this.id){
      addressId = this.id
    }else{
      addressId = 0
    }
    api.addAddress({
      username: val.user,
      userphone: val.phone,
      address: val.address,
      id: parseInt(addressId),
      userToken: localStorage.getItem('userToken'),
      province,city,district,prior,
    }).then(data=>{
      Toast.hide()
      if(data.resultCode == 0){
        Toast.success(data.resultMsg,3,()=>{
          this.props.history.push("/addressManage")
        })
      }else{
        Toast.fail(data.resultMsg)
      }
    })
  }

  handlePlace(district,city,province){
    if(province.label == city.label) {
      this.setState({
        selectedArea: city.label + district.label
      })
    }else{
      this.setState({
        selectedArea: province.label + city.label + district.label
      })
    }
    this.setState({
      province: province.label,
      district: district.label,
      city: city.label
    })
  }

  render(){
    const { getFieldProps } = this.props.form;
    let { selectedArea, addressDetail } = this.state
    console.log("ssss",this.props.form.getFieldsValue())
    return (
      <div className="addAddress">
        <AddressPicker
          cascade={2}
          ref="addrModal"
          ok={(district,city,province)=> this.handlePlace(district,city,province)}
        />
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            <div className="save" key="save" onClick={this.save.bind(this,this.props.form.getFieldsValue())}>保存</div>
          ]}
        >添加收货地址</NavBar>
        <div className="content">
          <List>
            <InputItem
              {...getFieldProps('user',{
                initialValue:addressDetail.username // 初始值
              })}
              clear
              placeholder="收货人"
            ></InputItem>
            <InputItem
              {...getFieldProps('phone',{
                initialValue:addressDetail.userphone // 初始值
              })}
              clear
              placeholder="手机号码"
            ></InputItem>
            <InputItem
              clear
              placeholder="地区"
              value={selectedArea}
              onClick={()=>{
                this.refs.addrModal.openModal();
              }}
            ></InputItem>
            <TextareaItem
              {...getFieldProps('address',{
                initialValue:addressDetail.detailAddress // 初始值
              })}
              placeholder="详细地址"
              data-seed="logId"
              rows={3}
            />
          </List>
          <div className="morendizhi">
            <List>
              <List.Item
                extra={<Switch
                  checked={this.state.checked}
                  onChange={() => {
                    this.setState({
                      checked: !this.state.checked,
                    });
                  }}
                />}
              >设为默认地址</List.Item>
            </List>
          </div>
        </div>
      </div>  
    )
  }
}
const address = createForm()(addressManage);
export default address;