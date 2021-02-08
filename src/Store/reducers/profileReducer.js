import update from 'react-addons-update';
import {
    START_PROFILE_LOADING,
    SUCCESS_PROFILE_LOADING,
    ERROR_PROFILE_LOADING
} from '../actions/profileActions'

const initialStore = {
    profile:{},
    isLoading:false,
    error:null,
 };

export default function profileReducer(store = initialStore, action) {
    switch(action.type){
        case START_PROFILE_LOADING:{
            return update(store,{
                isLoading: {$set:true} ,
                error:{$set:null}
            });
        }
        case SUCCESS_PROFILE_LOADING:{
            console.log(action.payload)
            return update(store,{
                profile: {$set:action.payload.data[0]},
                isLoading:{$set: false} ,
                error:{$set:null}
            });
        }
        case ERROR_PROFILE_LOADING: {
            return  update(store,{
                isLoading: {$set:false} ,
                error:{$set:action.payload.error}
            });
    }
        default:
            return store;
    }
}