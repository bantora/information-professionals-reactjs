import { ReactElement } from 'react';

import { useState, useEffect } from 'react';
import { productData } from './util/data';
import './App.css';

interface FilteredValue {
  cost: number | string;
  productID: string;
  productName: string;
}

interface Cart extends FilteredValue {
  quantity: number;
  amount: number;
}

const App = (): ReactElement => {
  const [cart, setCart] = useState<Cart[] | []>([]);
  const [search, setSearch] = useState('');
  const [qty, setQty] = useState('');
  const [ttlAmt, setTtlAmt] = useState('');
  const [change, setChange] = useState('');
  const [cash, setCash] = useState('');
  const [filteredValue, setFilteredValue] = useState<FilteredValue>({
    cost: '', productID: '', productName: ''
  });

  const handleControlled = (value: string, setter: (val: string) => void) => {
    setter(value)
  }

  const handleSearch = (pName: string) => {
    const filter = productData.filter(({ productName }) => productName === pName)[0]
    if (filter) setFilteredValue(filter)
  }

  const handleAddtoCart = () => {
    setCart([{ ...filteredValue, quantity: +qty, amount: +qty * +filteredValue.cost }, ...cart])
  }

  const handleDelete = (i: number) => {
    setCart(cart.filter((_, ind) => ind !== i))
  }

  const handleSave = () => {
    const change = +ttlAmt + +cash
    setChange(change.toString());
  }

  const renderTable = () => cart?.map(({ productID, cost, productName, quantity, amount }, i) => {
    return (
      <tr key={`${productID}+${productName}+${i}`}>
        <td>{productID}</td>
        <td>{productName}</td>
        <td>{cost}</td>
        <td>{quantity}</td>
        <td>{amount}</td>
        <td><button className='delete-button' onClick={() => handleDelete(i)}>Delete</button></td>
      </tr>
    )
  });

  useEffect(() => {
    setTtlAmt(cart.reduce((accum, { amount }) => accum + amount, 0).toString())
  }, [cart])

  return (
    <>
      <div className='container-1'>
        Search Product:
        <input value={search} onChange={({ target: { value } }) => handleControlled(value, setSearch)} />
        <button className='button' onClick={() => handleSearch(search)}>Search</button>
      </div>

      <div></div>

      <div className='container-2'>
        <div>Product ID:</div><input value={filteredValue.productID} />
        <div>Product Name:</div><input value={filteredValue.productName} />
        <div />
        <div>Cost:</div><input value={filteredValue.cost} />
        <div>Quantity:</div><input className='blue-field' type='number' value={qty} onChange={({ target: { value } }) => handleControlled(value, setQty)} />
        <button className='button' onClick={handleAddtoCart}>Add to Cart</button>
      </div>

      <table className='table-cart'>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Cost</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
        {renderTable()}
      </table>

      <div className='container-3'>
        <div style={{ marginRight: '1rem' }}>Total Amount:</div><input value={ttlAmt} /><div />
        <div>Cash:</div><input className='blue-field' value={cash} onChange={({ target: { value } }) => handleControlled(value, setCash)} /><div />
        <div>Change:</div> <input value={change} /><button className='button' onClick={handleSave}>Save</button><div />
      </div>
    </>
  )
}

export default App
