import React, { useEffect, useState } from 'react';
import { IProduct } from '../models';
import axios, { AxiosError } from 'axios';

interface UseProductsReturn {
  products: IProduct[];
  loading: boolean;
  error: string;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get<IProduct[]>(
        'https://fakestoreapi.com/products?limit=5'
      );

      setProducts(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;

      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error };
};
