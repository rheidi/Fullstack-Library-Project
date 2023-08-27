import React, { useEffect, useState } from 'react'
import { addNewBook, editBook, fetchOneBook } from '../redux/reducers/bookReducer'
import useAppDispatch from '../hooks/useAppDispatch'
import { Genre } from '../types/Genre'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import useAppSelector from '../hooks/useAppSelector'
import { fetchAllAuthors } from '../redux/reducers/authorReducer'

const AddOrEditBook = () => {
  const id = useParams().id
  const { book } = useAppSelector(state => state.bookReducer)
  const { authors } = useAppSelector(state => state.authorReducer)
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [year, setYear] = useState(2000)
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState(Genre.Crime)
  const image = 'https://picsum.photos/300'
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(fetchOneBook())
    }
    dispatch(fetchAllAuthors())
  }, [dispatch, id])


  
  if (book) {
    setTitle(book.title)
    setYear(book.year)
    setAuthor(book.author.id)
    setDescription(book.description)
    setGenre(book.genre)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (id) {
      dispatch(editBook({ id, title, year, author, description, genre, image }))
      navigate(`/books/${id}`)
    } else {
      const res = dispatch(addNewBook({ title, year, author, description, genre, image }))
      navigate(`/books/${res}`)
    }
  }


  return (
    <div>
      <h1>{book ? 'Edit book' : 'Add a new book'}</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <fieldset>
          <legend>New product info:</legend>
          <label id="title">
            title:
            <input onChange={e => setTitle(e.target.value)} name="title" value={title} />
          </label>
          <br />
          <label id="year">
            year:
            <input onChange={e => setYear(parseInt(e.target.value))} name="year" value={year} />
          </label>
          <br />
          <label id="author">
            author:
            <select 
              onChange={e => setAuthor(e.target.value)}
              name="author"
            >
              {authors.map(author => {
                return <option value={author.id}>{`${author.firstname} ${author.lastname}`}</option>
              })}
            </select>
          </label>
          <br />
          <label id="description">
            description:
            <input
              onChange={e => setDescription(e.target.value)}
              name="description"
              value={description}
            />
          </label>
          <br />
          <label id="categoryId">
            category id:
            <select name="genre" id="genre" onChange={e => setGenre(e.target.value as Genre)}>
              <option value={Genre.Novel}>{Genre.Novel}</option>
              <option value={Genre.Romance}>{Genre.Romance}</option>
              <option value={Genre.Crime}>{Genre.Crime}</option>
              <option value={Genre.SCiFi}>{Genre.SCiFi}</option>
              <option value={Genre.Fantasy}>{Genre.Fantasy}</option>
              <option value={Genre.Horror}>{Genre.Horror}</option>
              <option value={Genre.Poems}>{Genre.Poems}</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default AddOrEditBook
