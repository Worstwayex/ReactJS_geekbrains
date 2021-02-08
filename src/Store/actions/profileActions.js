export const START_PROFILE_LOADING = '@@profile/START_PROFILE_LOADING';
export const SUCCESS_PROFILE_LOADING = '@@profile/SUCCESS_PROFILE_LOADING';
export const ERROR_PROFILE_LOADING = '@@profile/ERROR_PROFILE_LOADING';

const apii = process.env.PUBLIC_URL + '/api/profile.json'

const startProfileLoading =() =>({
    type:START_PROFILE_LOADING
 })
 
 const successProfileLoading = (data) =>({
    type:SUCCESS_PROFILE_LOADING,
    payload:{
       data
    }
 })
 
 const errorProfileLoading = (error) =>({
    type:ERROR_PROFILE_LOADING,
    payload:{
       error
    }
 })

 export const profileLoading = () => (dispatch) =>{
    dispatch(startProfileLoading());
    fetch(apii)
       .then(response=> response.json())
       .then(data => dispatch(successProfileLoading(data)))
       .catch(err =>dispatch(errorProfileLoading(err)))
 }