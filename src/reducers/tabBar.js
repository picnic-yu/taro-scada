import { HOME, MORE, MINE } from '../actions-type/tabBar' 

const init_state = {
  currentTab: 0
}


export default function tabBar(state = init_state, action) {
  
  switch (action.type) {
    case HOME:
      return {
        ...state,
        currentTab: 0
      }
    case MORE:
      return {
        ...state,
        currentTab: 1
      }
    case MINE:
      return {
        ...state,
        currentTab: 2
      }
    default:
      return state
  }
}
