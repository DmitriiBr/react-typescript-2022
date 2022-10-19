import React, { useState } from 'react';
import Loader from './components/Loader';
import Product from './components/Product';
import { useProducts } from './hooks/products';
import Error from './components/Error';
import Modal from './components/Modal';
import CreateProduct from './components/CreateProduct';
import { IProduct } from './models';

function App() {
  // https://fakestoreapi.com/products/2
  const [modal, setModal] = useState(false);
  const { products, loading, error, addProduct } = useProducts();

  const createHandler = (product: IProduct) => {
    setModal(false);
    addProduct(product);
  };

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <Error error={error} />}
      <button
        className="fixed bottom-5 right-5 
        rounded-full bg-red-400 text-white text-2xl
        px-4 py-2 font-bold"
        onClick={() => setModal(true)}
      >
        +
      </button>
      {products.map((product) => (
        <Product
          product={product}
          key={product.id}
        />
      ))}
      {modal && (
        <Modal
          title="Create new product."
          onClose={() => setModal(false)}
        >
          <CreateProduct onCreate={createHandler} />
        </Modal>
      )}
    </div>
  );
}

export default App;
