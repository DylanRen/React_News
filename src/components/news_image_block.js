/**
 * Created by RS on 2017/9/6.
 */
/**
 * 图片新闻列表组件
 */
import React ,{Component , PropTypes} from 'react'
import {Card} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
export default class NewsImageBlock extends Component{

  static propTypes = {
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
    cardTitle:PropTypes.string.isRequired,
    cardWidth:PropTypes.string.isRequired,
    imageWidth:PropTypes.string.isRequired,
  }

  state ={
    newsArr:null
  }

  componentDidMount(){
    //发送ajax请求，得到新闻列表数据
    const {type , count , } = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response =>{
        // const newsArr = response.data.map(news =>{
        //   return {
        //     uniqueKey:news.uniqueKey,
        //     title:news.title
        //   }
        // })
        //形参结构赋值
        const newsArr = response.data.map(({uniquekey,title,author_name,thumbnail_pic_s})=> ({uniquekey,title,author_name,thumbnail_pic_s}))
        //更新状态
        this.setState({newsArr})
      })
  }


  render(){
    const {cardTitle,cardWidth,imageWidth ,type} = this.props
    const {newsArr} = this.state
    //定义图片样式对象
    const imageStyle = {
      width:imageWidth,
      height:'90px',
      display:'block'
    }
    //定义样式对象
    const titleStyle = {
      width:imageWidth,
      whiteSpace:"nowrap",//不换行
      overflow:"hidden",//超出的部分自动隐藏
      textOverflow:"ellipsis"//显示省略号
    }

    const newsList = !newsArr
      ? <h2>没有任何新闻</h2>
      : (
          newsArr.map((news ,index) =>(
            <div key={index} className="imageblock">
              <Link to={`/news_detail/${news.uniquekey}/${type}`}>
                <div>
                  <img src={news.thumbnail_pic_s} style={imageStyle}/>
                </div>
                <div className="custom-card">
                  <h3 style={titleStyle}>{news.title}</h3>
                  <p>{news.author_name}</p>
                </div>
              </Link>
            </div>
          ))
        )
    return(
      <Card title={cardTitle} style={{width:cardWidth}} className="topNewsList">
        {
          newsList
        }
      </Card>
    )
  }
}
