const authUser = JSON.parse(localStorage.getItem("authUser"))

const accessToken = (authUser) ? authUser.token : ''
export const currUser = (authUser) ? authUser.user : {}

export default accessToken;
