import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
    name: 'book',
    initialState: {
       title: '',
       author: '',
       category:[],
       description:'',
       image:'',
       editId:null
    },
    reducers: {
      setTitle : (state, action) => {
            state.title = action.payload;
        },
       setAuthor: (state, action) => {
            state.author = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },

        setDescription:(state, action) => {
            state.description = action.payload;
        },
        
        setImage:(state, action) => {
            state.image = action.payload;
        },

    setEditId:(state, action) => {
            state.editId = action.payload;
        }

    }
});

export const { setTitle, setAuthor,setCategory,setDescription,setImage,setEditId } = bookSlice.actions;

export const selectTitle = (state) => state.book.title;
export const selectAuthor = (state) => state.book.author;
export const selectCategory = (state) => state.book.category;
export const selectDescription = (state) => state.book.description;
export const selectImage = (state) => state.book.image;
export const selectEditId = (state) => state.book.editId;
export default bookSlice.reducer;