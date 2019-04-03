import { combineReducers } from 'redux'
import counter from './counter'
import tabBar from './tabBar'
export default combineReducers({
  counter,
  tabBar
})
