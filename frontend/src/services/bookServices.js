import instance from "./instance"

const bookServices= {

    createBook:async(userData)=>{
         return await instance.post('/book', userData)

    },
    uploadSingleFile: async (formData) => {
  return await instance.post("/file/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
},
     getBooks:async()=>{
return await instance.get('/book')

     },

    getBookById :async(id)=>{
        return await instance.get(`/book/${id}`)

    },

    updateBook:async(id,userData)=>{
        return await instance.put(`/book/${id}`,userData) 
    },

    deleteBook:async(id)=>{
        return await instance.delete(`/book/${id}`)
    }

}

export default bookServices