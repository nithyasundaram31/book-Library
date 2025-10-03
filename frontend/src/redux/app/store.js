import { configureStore } from "@reduxjs/toolkit";
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice';
import userReducer from '../features/auth/userSlice';
import bookReducer from '../features/auth/bookSlice';
const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        user:userReducer,
        book:bookReducer
 
    }
})

export default store;