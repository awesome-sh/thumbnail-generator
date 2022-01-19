const SET_CURRENT_MENU = 'CURRENT_MENU'
const SET_NAVIGATOR = 'NAVIGATOR'
const SET_LANGUAGE = 'LANGUAGE'
const SET_MENU_FOLD = 'SET_MENU_FOLD'

// Main > Notices
const SET_NOTICE_LIST = 'notice/SET_NOTICE_LIST'
const SET_NOTICE_DETAIL = 'notice/SET_NOTICE_DETAL'

// Main > Users
const SET_USER_LIST = 'user/SET_USER_LIST'

// Main > Contact
const SET_CONTACT_LIST = 'contact/SET_CONTACT_LIST'

// Examinations
const SET_EXAM_LIST = 'examination/SET_EXAM_LIST'

export const setCurrentMenu = ( currentMenu ) => ({ type: SET_CURRENT_MENU, payload: currentMenu })
export const setNavigator = ( navigator ) => ({ type: SET_NAVIGATOR, payload: navigator })
export const setLanguage = ( lang ) => ({ type: SET_LANGUAGE, payload: lang })

export const setMenuFold = ( fold ) => ({ type: SET_MENU_FOLD, payload: fold })

export const setNoticeList = ( list ) => ({ type: SET_NOTICE_LIST, payload: list })
export const setNoticeDetail = ( detail ) => ({ type: SET_NOTICE_DETAIL, payload: detail })

export const setUserList = ( list ) => ({ type: SET_USER_LIST, payload: list })
export const setContactList = ( list ) => ({ type: SET_CONTACT_LIST, payload: list })

export const setExamList = ( list ) => ({ type: SET_EXAM_LIST, payload: list })

const initialState = {
    size: {
        width: 720,
        height: 480
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_MENU : {
            return {
                ...state,
                currentMenu: action.payload
            }
        }
        case SET_NAVIGATOR : {
            return {
                ...state,
                navigator: action.payload
            }
        }
        case SET_LANGUAGE : {
            return {
                ...state,
                lang: action.payload
            }
        }
        case SET_MENU_FOLD : {
            return {
                ...state,
                fold: action.payload
            }
        }
        case SET_NOTICE_LIST : {
            return {
                ...state,
                notice: action.payload
            }
        }
        case SET_NOTICE_DETAIL : {
            return {
                ...state,
                notice: action.payload
            }
        }
        case SET_USER_LIST : {
            return {
                ...state,
                users: action.payload
            }
        }
        case SET_CONTACT_LIST : {
            return {
                ...state,
                contacts: action.payload
            }
        }
        case SET_EXAM_LIST : {
            return {
                ...state,
                exams: action.payload
            }
        }
        default : return state
    }
}

