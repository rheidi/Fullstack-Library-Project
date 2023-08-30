import { FormEvent, useEffect, useState } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { useNavigate, useParams } from "react-router-dom"
import { addNewAuthor, clearAuthor, editAuthor, fetchOneAuthor } from "../redux/reducers/authorReducer"

const AddOrEditAuthor = () => {
  const id = useParams().id
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [birthYear, setBirthYear] = useState(0)
  const { currentAuthor } = useAppSelector(state => state.authorReducer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(id && (!currentAuthor || currentAuthor.id !== id)) {
      dispatch(fetchOneAuthor(id))
    } else {
      dispatch(clearAuthor())
    }
  }, [dispatch, id, currentAuthor])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentAuthor) {
      const { id } = currentAuthor
      dispatch(editAuthor({ id, firstName: firstname, lastName: lastname, yearOfBirth: birthYear }))
    } else {
      const res = dispatch(addNewAuthor({ firstName: firstname, lastName: lastname, yearOfBirth: birthYear }))
      navigate(`/edit_author/${res}`)
    }
  }

  return <div>
  <h1>{currentAuthor ? 'Edit author' : 'Add a new author'}</h1>
    <form onSubmit={e => handleSubmit(e)}>
      <fieldset>
        <legend>New author info:</legend>
        <label htmlFor="firstname" id="firstname">
          firstname:
        </label>
        <input onChange={e => setFirstname(e.target.value)} name="firstname" value={firstname} />
        <label htmlFor="firstname" id="firstname">
          firstname:
        </label>
        <input onChange={e => setLastname(e.target.value)} name="lastname" value={lastname} />
        <label htmlFor="firstname" id="firstname">
          firstname:
        </label>
        <input type="number" onChange={e => setBirthYear(parseInt(e.target.value))} name="birthYear" value={birthYear} />
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  </div>
}

export default AddOrEditAuthor
