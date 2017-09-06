/**
 * Created by RS on 2017/9/4.
 */
/**
 * 头部组件
 */
import React ,{Component}from 'react'
import {
  Row,//行
  Col,//列
  Menu,//菜单
  Modal,//确认框
  Icon,//图标
  Button,//按键
  Tabs,//页签
  Form,//表单
  Input,//输入框
  message,//消息
} from "antd"
import {Link} from 'react-router'
import axios from 'axios'
import logo from '../images/logo.png'


//菜单项组件
const MenuItem = Menu.Item
//页签项
const TabPane = Tabs.TabPane
//表单项
const FormItem = Form.Item

class NewsHeader extends Component{

  state = {
    selectedKey:'top',
    username:null,
    modalShow:false
  }


    //重写一个生命周期
  componentDidMount(){
    //读取保存到本地localde中的username
    const username = localStorage.getItem('username')
    if(username){
      //更新状态
      this.setState({username})
    }
  }

  clickMenu = (event) => {
      //如果点击的是'登陆/注册'
    if(event.key==='logout'){
      //显示modal
      this.setState({modalShow:true})
    }

    //更新状态
    this.setState({selectedKey:event.key})
}

    //处理提交登录的请求
  handleSubmit = (islogin) => {
    //收集表单输入的数据
    const {username,password,r_userName,r_password,r_confirmPassword} = this.props.form.getFieldsValue()
    let url ='http://newsapi.gugujiankong.com/Handler.ashx?'
    if(islogin){
      url += `action=login&username=${username}&password=${password}`
    }else{
      url +=`action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    }
    axios.get(url)
      .then(response =>{

        //每次都进行清除设置
        this.props.form.resetFields()

        const result = response.data
        if(islogin){
          if(!result){
            message.error('登录失败，请重新登录！！！')
          }else{
            message.success('登录成功')
            //读取返回的username/userId
            const username = result.NickUserName
            const userId = result.UserId

            //更新状态并保存username/userId

            this.setState({username})
            localStorage.setItem('username' , username)
            localStorage.setItem('userId' , userId)
          }
        }else{
          //提示成功
          message.success('注册完成')
        }
      })
    //设置modal框关闭功能
    this.setState({modalShow:false})
  }

  showModal = (isShow) =>{
    this.setState({modalShow:isShow})
  }

  //退出设置
  Logout =()=>{
    //更新状态
    this.setState({username:null})
    //清除用户的登录数据
    localStorage.removeItem('username')
    localStorage.removeItem('userId')

  }

  render(){
    const {selectedKey , username , modalShow} = this.state
    const userShow = username
      ? (
          <MenuItem key="login" className="register">
            <Button type='primary'>{username}</Button>&nbsp;&nbsp;
            <Link to="/user_center"><Button type='dashed'>个人中心</Button></Link>&nbsp;&nbsp;
            <Button onClick={this.Logout}>退出</Button>
          </MenuItem>
        )
      : (
          <MenuItem key="logout" className="register">
            <Icon type="appstore"/>登陆/注册
          </MenuItem>
        )

    const { getFieldDecorator} = this.props.form;

    return(
      <header>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <a href="#/" className="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal" selectedKeys={[selectedKey]} onClick={this.clickMenu}>
              <MenuItem key="top">
                <Icon type="appstore"/>头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore"/>社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>

              {userShow}
            </Menu>
            <Modal title="用户中心"
                   visible={modalShow}
                   onOk={this.showModal.bind(this,  false)}
                   onCancel={() =>this.showModal(false)}
                   okText="关闭">
              <Tabs typr="card" onChange={() => this.props.form.resetFields()}>
                <TabPane tab="登陆" key="1" >
                  <Form onSubmit={this.handleSubmit.bind(this,true)}>
                    <FormItem label="用户名">
                      {
                        getFieldDecorator('username')(
                          <Input type="text" placeholder="请输入用户名"/>
                        )
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator('password')(
                          <Input type="password" placeholder="请输入密码"/>
                        )
                      }
                    </FormItem>
                    <Button type='primary' htmlType='submit'>登陆</Button>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form onSubmit={this.handleSubmit.bind(this,false)}>
                    <FormItem label="用户名">
                      {
                        getFieldDecorator('r_userName')(
                          <Input type="text" placeholder="请输入用户名"/>
                        )
                      }
                    </FormItem >
                    <FormItem label="密码">
                      {
                        getFieldDecorator('r_password')(
                          <Input type="password" placeholder="请输入密码"/>
                        )
                      }
                    </FormItem>
                    <FormItem label="确认密码">
                      {
                        getFieldDecorator('r_confirmPassword')(
                          <Input type="password" placeholder="请确认密码"/>
                        )
                      }
                    </FormItem>
                    <Button type='primary' htmlType='submit'>注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
      </header>
    )
  }
}
//对NewsHeader组件进行包装产生一个新的组件类，向NewsHeader传入一个属性：form
export default Form.create()(NewsHeader);