import { FormEvent, useEffect, useState } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { useNavigate, useParams } from "react-router-dom"
import { addNewAuthor, clearAuthor, editAuthor, fetchOneAuthor } from "../redux/reducers/authorReducer"

const AddOrEditAuthor = () => {
  const id = useParams().id
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [birthYear, setBirthYear] = useState(1900)
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

  if (id && currentAuthor && currentAuthor.firstName !== firstname) {
    setFirstname(currentAuthor.firstName)
    setLastname(currentAuthor.lastName)
    setBirthYear(currentAuthor.yearOfBirth ?? 0)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentAuthor) {
      dispatch(editAuthor({ id: currentAuthor.id, firstName: firstname, lastName: lastname, yearOfBirth: birthYear }))
    } else {
      dispatch(addNewAuthor({ firstName: firstname, lastName: lastname, yearOfBirth: birthYear }))
    }
    navigate(`/authors`)
  }

  return <div>
  <h1>{currentAuthor ? 'Edit author' : 'Add a new author'}</h1>
    <form onSubmit={e => handleSubmit(e)}>
      <fieldset>
        <legend>New author info:</legend>
        <label htmlFor="firstname" id="firstname">
          Firstname:
        </label>
        <input onChange={e => setFirstname(e.target.value)} name="firstname" value={firstname} />
        <label htmlFor="firstname" id="firstname">
          Lastname:
        </label>
        <input onChange={e => setLastname(e.target.value)} name="lastname" value={lastname} />
        <label htmlFor="lastname" id="lastname">
          Birth year:
        </label>
        <input type="number" onChange={e => setBirthYear(parseInt(e.target.value))} name="birthYear" value={birthYear} />
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  </div>
}

export default AddOrEditAuthor
