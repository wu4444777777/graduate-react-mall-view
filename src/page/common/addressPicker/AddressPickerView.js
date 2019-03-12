/**
 * Created by zhang.weihua on 2018/3/20.
 */
/**
 * props参数
 * cascade 默认是1  //2级就传1，3级就传2
 * ok  //func(item)  选择之后的回调函数, item是选中的市
 */
import React, { PropTypes, Component } from 'react';
import { Flex, Toast, Modal, Icon, } from 'antd-mobile';
import './AddressPickerLess.less';
import district from './district';

const defaultItem = { label: '请选择' };

class AddressPickerView extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            loading: false,
            areaData: district,    //总数据
            areaList: district,    //显示数据
            selectedArea: [defaultItem],//0,1,2-->省，市，区
            index: 0,    //表示进行到那个tab
            selectedProvince: {}
        }

        this.cascade = props.cascade || 1;
    }

    componentDidMount() {
    }

    closest(el, selector) {
      const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
      while (el) {
        if (matchesSelector.call(el, selector)) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    }

    openModal = () => {
        this.stopBodyScroll(true)
        
        this.setState({
            show: true
        })
    }
    
    stopBodyScroll(isFixed) {
        let bodyEl = document.body
        let top = 0
        if (isFixed) {
            // top = window.scrollY

            // bodyEl.style.position = 'fixed'
            // bodyEl.style.top = -top + 'px'
        } else {
          top = Math.abs(parseInt(bodyEl.style.top))
            bodyEl.style.position = ''
            bodyEl.style.top = ''

            window.scrollTo(0, top) // 回到原先的top
        }
    }



_onClose = () => {
    this.stopBodyScroll(false)
    
    this.setState({
        show: false
    }, () => {
        this.props.onClose && this.props.onClose();
    })
}

//切换loading状态
_toggleLoading = () => {
    this.setState({
        loading: !this.state.loading
    })
}


//区域选择
_areaClick = (item, idx) => {

    let { selectedArea, index, selectedProvince} = this.state;
    selectedArea[index] = item;
    
    console.log(selectedArea)
    console.log(item, selectedProvince)
    document.getElementsByClassName('area-content')[0].scrollTop = 0
    if (index == this.cascade) {
        this.setState({
            selectedArea: selectedArea,
        })
        this._onClose();
        this.props.ok && this.props.ok(selectedArea[index], selectedArea[index-1], selectedArea[index-2]);
    } else {
        index++;
        selectedArea[index] = defaultItem;
        this.setState({
            selectedArea: selectedArea,
            index: index,
            areaList: item.children,
            selectedProvince: item
        })
    }

}

//切换tab
_tabClick = (index) => {
    if (this.state.index != index) {
        if (index === 0) {   //获取省份
            this.setState({
                index: index,
                areaList: this.state.areaData
            })
        } else {
            this.setState({
                index: index,
                areaList: this.state.selectedArea[index - 1].children
            })
        }

    }

}

render() {

    return (
        <Modal
            popup
            visible={this.state.show}
            animationType="slide-up"
            closable
            onClose={this._onClose}
            // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
            <div className="address-picker-widget">
                <div className="address-header">
                    <span>选择您的城市</span>
                    {/* <Icon type="cross" size="lg" color="#ccc" className="icon-close" onClick={this._onClose}></Icon> */}
                </div>
                <Flex className="area-tabs">
                    {this.state.selectedArea.map((item, index) => (
                        <div className="tab" key={'tab' + index} onClick={this._tabClick.bind(this, index)}>
                            <div className={index === this.state.index ? 'tab-text active' : 'tab-text'}>{item.label}</div>
                        </div>
                    ))}

                </Flex>
                <div className="area-content" ref='areaContent'>

                    {this.state.areaList.map((item, index) => {
                        let selected = this.state.selectedArea[this.state.index].value == item.value;
                        return (
                            <div className={`area-item ${selected ? 'active' : ''}`} key={'area' + index} onClick={this._areaClick.bind(this, item, index)}>
                                {item.label}
                            </div>
                        )
                    })}
                </div>
                {
                    this.state.loading ? (
                        <Flex className="loading" justify="center">
                            <Icon type="loading" />
                        </Flex>
                    ) : null
                }

            </div>
        </Modal>
    )
}
}

export default AddressPickerView;
