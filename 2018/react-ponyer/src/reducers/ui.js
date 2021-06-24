import { 
  CHANGE_PAGE_TITLE, 
  IS_SHOW_NAVBAR,
  IS_SUBPAGE
} from '../actions/actionType';

const initialState = {
  pageTitle: '首页',
  isShowNavbar: true,
  isSubpage: false
};

export default (state = initialState, action) => {
  switch(action.type){
    case CHANGE_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload.title
      }
    case IS_SHOW_NAVBAR:
      return {
        ...state,
        isShowNavbar: action.payload.isShowNavbar
      }
    case IS_SUBPAGE:
      return {
        ...state,
        isSubpage: action.payload.isSubpage
      }
    default:
      return state;
  }
}