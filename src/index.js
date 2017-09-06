/**
 * Created by RS on 2017/9/1.
 */
import React from 'react'
import {render} from 'react-dom'
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'

render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={NewsContainer}></IndexRoute>
      <Route path='/new_detail/:id' component={NewsDetail}></Route>
      <Route path='/user_center' component={UserCenter}></Route>
    </Route>
  </Router>
),document.getElementById('root'))