import { FormEvent, useState } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { useNavigate } from "react-router-dom"
import { addNewAuthor, editAuthor } from "../redux/reducers/authorReducer"

const AddOrEditAuthor = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const { currentAuthor } = useAppSelector(state => state.authorReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (currentAuthor) {
        const { id } = currentAuthor
        dispatch(editAuthor({ id, firstname, lastname, birthYear }))
      } else {
        const res = dispatch(addNewAuthor({ firstname, lastname, birthYear }))
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
          <input onChange={e => setBirthYear(e.target.value)} name="birthYear" value={birthYear} />
        </fieldset>
      </form>
    </div>
}

export default AddOrEditAuthor
