import { useState, useEffect } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import ProductCard from '../../components/ProductCard';
import styles from "./index.module.css";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {query: {limit = 12, skip = 0}} = context;
  const productsURL = 'https://dummyjson.com/products?' + new URLSearchParams({limit, skip});
  const res = await fetch(productsURL);
  const data = await res.json();
  return { props: { data } };
}

export default function ProductList({data}) {
  const [products, setProducts] = useState([]);
  const [paginationParams, setPaginationParams] = useState({limit: 0, skip: 0, total: 0});
  const router = useRouter();
  const setProductState = (data) => {
    const {products, limit, skip, total} = data;
    setProducts(products);
    setPaginationParams({limit, skip, total});
  };

  const setPagination = (action) => {
    const { limit, skip } = paginationParams;
    const newParams = {
      skip: action === 'prev' ? skip - limit : skip + limit
    };
    setPaginationParams({...paginationParams, ...newParams});
    router.push({pathname: 'products', query: {limit, ...newParams}});
  };

  const currentPage = (paginationParams.skip / paginationParams.limit) + 1;
  const disablePrev = currentPage === 1;
  const disableNext = paginationParams.skip + (paginationParams.limit * 2) > paginationParams.total;

  useEffect(() => setProductState(data), [data]);
  return (
    <Layout>
      <div className={styles.productListContainer}>
        <div className={styles.listInfo}>
          <span>Viewing</span> <span>{`${paginationParams.skip + 1} - ${paginationParams.skip + paginationParams.limit}`}</span> <span>of</span> <span>{paginationParams.total}</span> <span>products</span>
        </div>
        <div className={styles.productList}>
          {products.map(pdt => <ProductCard product={pdt} key={pdt.id} />)}
        </div>
        <div className={styles.paginationMeta}>
          <button disabled={disablePrev} onClick={() => setPagination('prev')}>Prev</button>
          <span>{currentPage}</span>
          <button disabled={disableNext} onClick={() => setPagination('next')}>Next</button>
        </div>
      </div>
    </Layout>
  )
}