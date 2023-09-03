import React from 'react'
import { Link } from 'react-router-dom'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { emptyCart, removeFromCart } from '../redux/reducers/cartReducer'
import { loan } from '../redux/reducers/bookReducer'
import { formatAuthorName } from '../utils/authorUtils'

const Cart = () => {
  const cart = useAppSelector(state => state.cartReducer.books)
  const dispatch = useAppDispatch()

  const checkout = () => {
    dispatch(loan(cart))
    dispatch(emptyCart())
  }

  return (
    <aside>
      <h2>Selected book for borrowing</h2>

      {cart.length === 0 ? (
        <div>
          <p className="empty">Cart is still empty</p>
          <Link to={'/books'}>Reserve books</Link>
        </div>
      ) : (
        <div>
          <h3>books in cart:</h3>
          <ul id="cart">
            {cart.map(i => (
              <li className="cart-item" key={i.id}>
                <span className="title">{i.title}</span>
                <span className="year">{i.year}</span>
                <span className="author">{formatAuthorName(i.author)}</span>
                <button onClick={() => dispatch(removeFromCart(i))}>Remove book from cart</button>
              </li>
            ))}
          </ul>
          <p className="amount">Total amount of books: {cart.length}</p>
          <button onClick={e => dispatch(emptyCart())}>Empty cart</button>
          <button onClick={() => checkout()}>Loan books in cart</button>
        </div>
      )}
    </aside>
  )
}

export default Cart
