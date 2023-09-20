import { useState, useEffect } from 'react';
import type { GetServerSidePropsContext } from 'next';
import Layout from '../../components/layout';
import styles from "./productDetail.module.css";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query: { productId } } = context;
  const productURL = `https://dummyjson.com/products/${productId}`;
  const res = await fetch(productURL);
  const data = await res.json();
  return { props: { data } };
}

export default function ProductDetail({ data }) {
  const dummyImgUrl = 'https://img.freepik.com/premium-vector/photo-icon-picture-icon-image-sign-symbol-vector-illustration_64749-4409.jpg?w=1480';
  const [product, setProduct] = useState({});
  const [activeImg, setActiveImg] = useState({index: 0, url: dummyImgUrl});
  useEffect(() => {
    setProduct(data);
    setActiveImg({index: 0, url: data.images[0]});
  }, [data]);
  const updateImg = (action) => {
    const { index } = activeImg;
    const { images } = data;
    const newImg = {};
    if(action === 'next') {
      if(index === images.length - 1) {
        debugger;
        newImg.index = 0;
        newImg.url = images[0];
      } else {
        newImg.index = index + 1;
        newImg.url = images[index + 1];
      }
      
    }
    if(action === 'prev') {
      if(index === 0) {
        debugger;
        newImg.index = images.length - 1;
        newImg.url = images[images.length - 1];
      } else {
        newImg.index = index - 1;
        newImg.url = images[index - 1];
      }
    }
    setActiveImg(newImg);
  };
  return (
    <Layout>
      <div className={styles.productDetail}>
        <div className={styles.imgListWrapper}>
          <div className={styles.imgList}>
            <button onClick={() => updateImg('prev')}>Prev</button>
            <img src={activeImg.url} alt={data.title} />
            <button onClick={() => updateImg('next')}>Next</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}