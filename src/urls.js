const BASE_URI = 'http://localhost:8000/'



const LOGIN_URL =                   BASE_URI + "rest-auth/login/";
const IS_USER_LOGGED_IN_URL =       BASE_URI +'rest-auth/user/'
const PAYMENTS_URL =                BASE_URI + 'payments/'
const GROUPS_URL =                  BASE_URI + 'groups/'
const LOGOUT_URL =                  BASE_URI + 'rest-auth/logout/'
export {BASE_URI, LOGIN_URL, IS_USER_LOGGED_IN_URL, PAYMENTS_URL, GROUPS_URL, LOGOUT_URL}
export default BASE_URI