import React from 'react';
import { useProducts } from '../hooks/products';
import { useContext } from 'react';
import { IProduct } from '../models';
import { ModalContext } from '../context/ModalContext';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Product from '../components/Product';
import Modal from '../components/Modal';
import CreateProduct from '../components/CreateProduct';

const ProductsPage = () => {
  // https://fakestoreapi.com/products/2
  const { products, loading, error, addProduct } = useProducts();

  const { modal, open, close } = useContext(ModalContext);

  const createHandler = (product: IProduct) => {
    close();
    addProduct(product);
  };

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <Error error={error} />}
      <button
        className="fixed bottom-5 right-5 
        rounded-full bg-red-700 text-white text-2xl
        px-4 py-2 font-bold"
        onClick={open}
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
          onClose={close}
        >
          <CreateProduct onCreate={createHandler} />
        </Modal>
      )}
    </div>
  );
};

export default ProductsPage;
