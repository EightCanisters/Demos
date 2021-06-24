import { 
  CHANGE_PAGE_TITLE, 
  IS_SHOW_NAVBAR,
  IS_SUBPAGE
} from './actionType';

export const changePageTitle = (title) => {
  return {
    type: CHANGE_PAGE_TITLE,
    payload: {
      title
    }
  }
}

export const showNavbar = (isShowNavbar) => {
  return {
    type: IS_SHOW_NAVBAR,
    payload: {
      isShowNavbar
    }
  }
}

export const isSubpage = (isSubpage) => {
  return {
    type: IS_SUBPAGE,
    payload: {
      isSubpage
    }
  }
}