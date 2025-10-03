import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import bookServices from '../../services/bookServices'

function BookDescription() {
  const { id } = useParams()   // get book id from URL
  const [book, setBook] = useState(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await bookServices.getBookById(id)
        setBook(response.data)
      } catch (err) {
        console.error('Error fetching book:', err)
      }
    }
    fetchBook()
  }, [id])

  if (!book) return <p>Loading...</p>

  return (
    <div className="flex items-center justify-center pt-10 p-10 ">
      <div className=" flex flex-col items-center justify-center w-full text-center  md:w-[60%] bg-gray-100 p-6 mb-4">
        <img  src={book.image} alt={book.title} className="w-32 h-32   object-cover mb-4 rounded" />
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-600 mb-1 "><strong>Author:</strong> <span>{book.author}</span></p>
        <p className="text-black text-left">{book.description}</p>
      </div>
    </div>
  )
}

export default BookDescription
