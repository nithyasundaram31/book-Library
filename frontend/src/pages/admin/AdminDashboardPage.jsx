import React, { useState, useEffect } from 'react';
import bookServices from '../../services/bookServices';
import { 
  selectAuthor, selectCategory, selectDescription, selectEditId, selectImage, selectTitle, 
  setAuthor, setCategory, setDescription, setEditId, setImage, setTitle 
} from '../../redux/features/auth/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function AdminDashboardPage() {
  const title = useSelector(selectTitle);
  const author = useSelector(selectAuthor);
  const category = useSelector(selectCategory);
  const description = useSelector(selectDescription);
  const image = useSelector(selectImage);
  const editId = useSelector(selectEditId);
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState("");

  // Show existing image filename when editing
  useEffect(() => {
    if (editId && typeof image === "string") {
      const name = image.split('/').pop();
      setFileName(name);
    } else {
      setFileName(""); // new creation
    }
  }, [editId, image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch(setImage(file));
    if (file) setFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    try {
      let imageUrl = image;

      if (image instanceof File) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadResponse = await bookServices.uploadSingleFile(formData);
        imageUrl = uploadResponse.data.url;
      }

      if (editId) {
        await bookServices.updateBook(editId, { title, author, category, description, image: imageUrl });
        toast.success("Book updated successfully");
        dispatch(setEditId(null));
      } else {
        await bookServices.createBook({ title, author, category, description, image: imageUrl });
        toast.success("Book created successfully");
      }

      // Reset form
      dispatch(setTitle(""));
      dispatch(setAuthor(""));
      dispatch(setCategory(""));
      dispatch(setDescription(""));
      dispatch(setImage(""));
      setFileName("");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mx-auto w-full md:w-[45%] p-6">
      {/* <h2 className="text-2xl mb-4">Admin Dashboard</h2> */}
      <form onSubmit={handleSubmit} className="border p-6 flex flex-col gap-6 mt-6">
        
        <input 
          type="text" 
          value={title} 
          onChange={(e) => dispatch(setTitle(e.target.value))} 
          placeholder="Title"
          className="border p-2 rounded"
        />

        <input 
          type="text" 
          value={author} 
          onChange={(e) => dispatch(setAuthor(e.target.value))} 
          placeholder="Author"
          className="border p-2 rounded"
        />

        <input 
          type="text" 
          value={category} 
          onChange={(e) => dispatch(setCategory(e.target.value))} 
          placeholder="Category"
          className="border p-2 rounded"
        />

        <textarea 
          value={description} 
          onChange={(e) => dispatch(setDescription(e.target.value))} 
          placeholder="Description"
          className="border p-2 rounded"
          rows={3}
        />

        {/* File input shows default "No file chosen" */}
        <div>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="border p-2 rounded w-full"
          />
          {/* Display the file name below */}
          {fileName && (
            <p className="mt-1 text-green-700">
              {editId && !fileName ? 'Current: ' : 'Selected: '}
              {fileName}
            </p>
          )}
        </div>

        <button 
          type="submit" 
          className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transform transition active:scale-90"
        >
          {editId ? "Update Book" : "Create Book"}
        </button>

      </form>
    </div>
  );
}

export default AdminDashboardPage;
