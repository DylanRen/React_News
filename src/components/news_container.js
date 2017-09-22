/**
 * Created by RS on 2017/9/4.
 */
/**
 * 默认路由组件（各种新闻列表）
 */
import React, {Component}from 'react'
import {
  Row ,
  Col ,
  Carousel,
  Tabs
} from 'antd'

import NewsBlock from './news_block'
import NewsImageBlock from './news_image_block'
import NewsProducts from './news_products'

import carouse_1 from '../images/carousel_1.jpg'
import carouse_2 from '../images/carousel_2.jpg'
import carouse_3 from '../images/carousel_3.jpg'
import carouse_4 from '../images/carousel_4.jpg'



const TabPane = Tabs.TabPane

export default class NewsContainer extends Component{
  render(){
    return(
      <div>
        <Row className='container'>
          <Col span={1} />
          <Col span={22}>
            <div className="leftContainer" style={{width:'35%'}}>
              {/*自动轮播*/}
              <Carousel autoplay>
                <div><img src={carouse_1} /></div>
                <div><img src={carouse_2} /></div>
                <div><img src={carouse_3} /></div>
                <div><img src={carouse_4} /></div>
              </Carousel>
              <NewsImageBlock type="guoji" count={6} cardTitle="国际新闻" cardWidth="100%" imageWidth='112px'></NewsImageBlock>
            </div>

            <Tabs className='tabs_news' style={{width:'35%'}}>
              <TabPane key="1" tab="头条新闻">
                <NewsBlock type="top" count={21}></NewsBlock>
              </TabPane>
              <TabPane key="2" tab="国际新闻">
                <NewsBlock type="guoji" count={21}></NewsBlock>
              </TabPane>
            </Tabs>
            <Tabs className="tabs_product" style={{width: '30%'}}>
              <TabPane tab="React News产品" key="1">
                <NewsProducts />
              </TabPane>
            </Tabs>

            <div>
              <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻" cardWidth="100%" imageWidth='132px'></NewsImageBlock>
              <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻" cardWidth="100%" imageWidth='132px'></NewsImageBlock>
            </div>
          </Col>
          <Col span={1} />
        </Row>
      </div>
    )
  }
}
