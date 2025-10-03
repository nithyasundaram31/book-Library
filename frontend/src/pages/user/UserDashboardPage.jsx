import React, { useEffect, useState } from 'react'
import bookServices from '../../services/bookServices'
import { useNavigate } from 'react-router-dom';

function UserDashboardPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(""); 
  const [categoryFilter, setCategoryFilter] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookServices.getBooks();
        console.log('book fetch respone is:', response.data)
        setBooks(response.data)
      } catch (error) {
        console.log('book fetch error is:', error)
      }
    }
    fetchBooks();
  }, []);

  const handleBook = async (id) => {
    try {
      const response = await bookServices.getBookById(id);
      console.log('book by id response is:', response.data)
      navigate(`/user/dashboard/book/${id}`)
    } catch (error) {
      console.log('book by id  error response is:', error)
    }
  }

  const allCategories = [
    ...new Set(
      books
        .map(book => {
          if (!book.category) return null;
          const category = typeof book.category === 'string' ? book.category.trim() : String(book.category).trim();
          return category || null;
        })
        .filter(Boolean)
    )
  ];

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(search.toLowerCase());
    const authorMatch = book.author.toLowerCase().includes(search.toLowerCase());
    const matchesSearch = titleMatch || authorMatch;

    const bookCategory = book.category ? 
      (typeof book.category === 'string' ? book.category.trim() : String(book.category).trim()) : '';
    const matchesCategory = !categoryFilter || bookCategory === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    console.log('Category changed to:', selectedValue); 
    setCategoryFilter(selectedValue);
  };

  return (
    <div style={{ backgroundColor: '#4B5563', minHeight: '100vh', paddingBottom: '2rem' }}>
      <div className='w-full md:w-[95%] mx-auto pt-8 px-4'>
        <div className='flex flex-col md:flex-row items-center gap-4 mb-12 justify-center'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            type='text'
            className='border w-full p-2 rounded md:w-[50%]'
            placeholder="Search by Title or Author"
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

        <section>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
            {filteredBooks.map((book) => (
              <button
                onClick={() => handleBook(book._id)}
                key={book._id}
                className='bg-white p-4 rounded border shadow flex flex-col items-center hover:scale-105 transition-transform duration-200'
              >
                <img
                  className='w-60 h-48 mb-4 rounded'
                  src={book.image}
                  alt={book.title}
                />
                <div className='text-left w-full'>
                  <div className='mb-1'><span className='font-semibold'>Title: </span><span className='text-gray-800'>{book.title}</span></div>
                  <div className='mb-1'><span className='font-semibold'>Author: </span><span className='text-gray-800'>{book.author}</span></div>
                  <div className='mb-1'><span className='font-semibold'>Category: </span><span className='text-gray-800'>{book.category}</span></div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default UserDashboardPage