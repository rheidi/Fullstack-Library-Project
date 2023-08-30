import React, { useEffect, useState } from 'react'
import { addNewBook, clearBook, deleteBook, editBook, fetchOneBook } from '../redux/reducers/bookReducer'
import useAppDispatch from '../hooks/useAppDispatch'
import { Genre } from '../types/Genre'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import useAppSelector from '../hooks/useAppSelector'
import { fetchAllAuthors } from '../redux/reducers/authorReducer'
import { AxiosError } from 'axios'
import { isAdmin } from '../utils/userUtils'


const AddOrEditBook = () => {
  const id = useParams().id
  const { book } = useAppSelector(state => state.bookReducer)
  const { authors } = useAppSelector(state => state.authorReducer)
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [year, setYear] = useState(2000)
  const [authorId, setAuthorId] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState(Genre.Crime)
  const imageUrl = 'https://picsum.photos/300'
  const navigate = useNavigate()

  useEffect(() => {
    if (id && (!book || book.id !== id)) {
      dispatch(fetchOneBook(id))
    } else {
      dispatch(clearBook())
    }
    // Ensure author selector has value upon load
    const ensureAuthors = async () => {
      const authorsList = await dispatch(fetchAllAuthors()).unwrap()
      if (authorsList instanceof AxiosError) {
        throw authorsList
      }
      if (authorId === '' && authorsList.length > 0) {
        setAuthorId(authorsList[0].id)
      }
    }
    ensureAuthors().catch(e => console.log(e))
  }, [dispatch, id, setAuthorId])
 
  if (id && book && title !== book.title) {
    setTitle(book.title)
    setYear(book.year)
    setAuthorId(book.authorId)
    setDescription(book.description)
    setGenre(book.genre)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (id) {
      dispatch(editBook({ id, description, genre, imageUrl }))
    } else {
      console.log(authorId)
      const selectedAuthor = authors.find(a => a.id === authorId)
      console.log(selectedAuthor)
      const authorName = selectedAuthor ? `${selectedAuthor.firstName} ${selectedAuthor.lastName}` : ''
      dispatch(addNewBook({ title, year, authorId, authorName, description, genre, imageUrl }))
    }
    navigate(`/books`)
  }

  function deleteBookAndNavigate(): void {
    if (id) {
      dispatch(deleteBook(id))
      setTimeout(() => navigate('/books'), 1500)
    }
  }

  return (
    <div>
      <h1>{book ? 'Edit book' : 'Add a new book'}</h1>
      {id && <button onClick={_ => deleteBookAndNavigate()}>Delete book</button>}

      <form onSubmit={e => handleSubmit(e)}>
        <fieldset>
          <legend>New product info:</legend>
          <label htmlFor="title">
            title:
          </label>
          <input onChange={e => setTitle(e.target.value)} name="title" value={title} />
          <label htmlFor="year">
            year:
          </label>
          <input type="number" onChange={e => setYear(parseInt(e.target.value))} name="year" value={year} />
          <label htmlFor="author">
            author:
          </label>
          <select 
            onChange={e => setAuthorId(e.target.value)}
            name="author"
            value={authorId}
          >
            {authors.map(author => {
              return <option key={author.id} value={author.id}>{`${author.firstName} ${author.lastName}`}</option>
            })}
          </select>
          <label htmlFor="description">
            description:
          </label>
          <input
            onChange={e => setDescription(e.target.value)}
            name="description"
            value={description}
          />
          <label htmlFor="categoryId">
            category id:
          </label>
          <select name="genre" id="genre" onChange={e => setGenre(e.target.value as Genre)}>
            <option value={Genre.Novel}>{Genre.Novel}</option>
            <option value={Genre.Romance}>{Genre.Romance}</option>
            <option value={Genre.Crime}>{Genre.Crime}</option>
            <option value={Genre.SciFi}>{Genre.SciFi}</option>
            <option value={Genre.Fantasy}>{Genre.Fantasy}</option>
            <option value={Genre.Horror}>{Genre.Horror}</option>
            <option value={Genre.Poems}>{Genre.Poems}</option>
          </select>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default AddOrEditBook
