import React, { useState } from 'react';
import { IProduct } from '../models';
import axios from 'axios';
import Error from './Error';

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    count: 10,
    rate: 5,
  },
};

interface CreateProductProps {
  onCreate: (product: IProduct) => void;
}

const CreateProduct = ({ onCreate }: CreateProductProps) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      setError('Please enter valid title');
      return;
    }

    productData.title = value;
    const response = await axios.post<IProduct>(
      'https://fakestoreapi.com/products',
      productData
    );

    setValue('');
    onCreate(response.data);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type={'text'}
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title..."
        value={value}
        onChange={changeHandler}
      />

      {error && <Error error={error} />}

      <button
        type="submit"
        className="py-2 px-4 border bg-yellow-400 hover:text-white"
      >
        Create
      </button>
    </form>
  );
};

export default CreateProduct;
