const initialStore = {
    profile:{
        username: "Mike",
        img: '',
        text:"Kakoi-to text",
    }
 };

export default function profileReducer(store = initialStore, action) {
    switch(action.type){
        default:
            return store;
    }
}