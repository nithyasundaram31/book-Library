import React, { useEffect, useState } from 'react';
import bookServices from '../services/bookServices';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { 
  selectAuthor, selectCategory, selectDescription, selectEditId, selectImage, selectTitle, 
  setAuthor, setCategory, setDescription, setEditId, setImage, setTitle 
} from '../redux/features/auth/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function BookTable() {
  const [books, setBooks] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [categoryFilter, setCategoryFilter] = useState(""); 
  const[loading,setLoading]=useState(true)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const fetchBook = async () => {
    try {
      const response = await bookServices.getBooks();
      console.log('Fetched books:', response.data); 
      setBooks(response.data);
      setLoading(false)
    } catch (error) {
      console.log('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  // Handle Update Button
  const handleUpdate = (id) => {
    const editMode = books.find((book) => book._id === id);
    if (editMode) {
      dispatch(setTitle(editMode.title));
      dispatch(setAuthor(editMode.author));
      dispatch(setCategory(editMode.category));
      dispatch(setDescription(editMode.description));
      dispatch(setImage(editMode.image));
      dispatch(setEditId(editMode._id));
    }
    navigate('/admin/dashboard');
  };

  // Handle Delete Button
  const handleDelete = async (id) => {
    try {
      await bookServices.deleteBook(id);
      setBooks(prev => prev.filter((book) => book._id !== id));
      toast.success('Book deleted successfully');
    } catch (error) {
      console.log('Error deleting book:', error);
    }
  };

  //  unique categories for dropdown 
  const allCategories = [
    ...new Set(
      books
        .map(book => {
          if (!book.category) return null;
          const category = typeof book.category === 'string' ? book.category.trim() : String(book.category).trim();
          return category || null;
        })
        .filter(Boolean) // remove null/empty/undefined
    )
  ];

  // Filter books by search text and selected category
  const filteredBooks = books.filter((book) => {
    // Handle search filtering
    const titleMatch =  book.title.toLowerCase().includes(search.toLowerCase()) ;
    const authorMatch =  book.author.toLowerCase().includes(search.toLowerCase()) ;
    const matchesSearch = titleMatch || authorMatch;

    // Handle category filtering
    const bookCategory = book.category ? 
      (typeof book.category === 'string' ? book.category.trim() : String(book.category).trim()) : '';
    const matchesCategory = !categoryFilter || bookCategory === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  console.log('Filtered books:', filteredBooks.length); 

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    console.log('Category changed to:', selectedValue); 
    setCategoryFilter(selectedValue);
  };

  if(loading){
    return <div className='mt-16 text-center'>Loading...</div>
  }
  return (
    <div className='w-full md:w-[90%] p-6 mx-auto'>
      
      <div className='flex flex-col md:flex-row justify-center items-center gap-2 mt-6 mb-6'>
        <input
          type='text'
          className='border p-2 w-full md:w-[60%] rounded'
          placeholder='Search by Title or Author'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className='w-full md:w-[200px] border py-2 px-4 mt-2 md:mt-0 rounded bg-white'
        >
          <option value="">-Select Category-</option>
          {allCategories.map((filter, index) => (
            <option key={index} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

    
       
      {/* Books Table */}
      {filteredBooks.length === 0 ? (
        <div className='font-semibold text-center mt-10'>
           No Books Found
        </div>
      ) : (
        <table className='w-full text-center md:w-[70%] mx-auto border'>
          <thead className='border bg-gray-100'>
            <tr>
              <th className='p-2'>Image</th>
              <th className='p-2'>Title</th>
              <th className='p-2'>Author</th>
              <th className='p-2'>Category</th>
              <th className='p-2'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book._id} className='border-t'>
                <td className="p-2">
                  <img 
                    src={book.image } 
                    alt={book.title } 
                    className="w-16 h-16 object-cover rounded mx-auto"
                    
                  />
                </td>
                <td className="p-2">{book.title }</td>
                <td className="p-2">{book.author }</td>
                <td className="p-2">{book.category}</td>
                <td className="p-2">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => handleDelete(book._id)} 
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete book"
                    >
                      <FaTrash className="w-4 h-4"/>
                    </button>
                    <button 
                      onClick={() => handleUpdate(book._id)} 
                      className="text-blue-500 hover:text-blue-700 p-1"
                      title="Edit book"
                    >
                      <FaEdit className="w-4 h-4"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookTable;