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
  const [activeImg, setActiveImg] = useState({ index: 0, url: dummyImgUrl });
  useEffect(() => {
    setProduct(data);
    setActiveImg({ index: 0, url: data.images[0] });
  }, [data]);
  const updateImg = (action) => {
    const { index } = activeImg;
    const { images } = data;
    const newImg = {};
    if (action === 'next') {
      if (index === images.length - 1) {
        newImg.index = 0;
        newImg.url = images[0];
      } else {
        newImg.index = index + 1;
        newImg.url = images[index + 1];
      }

    }
    if (action === 'prev') {
      if (index === 0) {
        newImg.index = images.length - 1;
        newImg.url = images[images.length - 1];
      } else {
        newImg.index = index - 1;
        newImg.url = images[index - 1];
      }
    }
    setActiveImg(newImg);
  };

  const getDiscountedPrice = () => {
    const originalPrice = product.price;
    const discount = product.discountPercentage;
    return (originalPrice - (originalPrice * (discount / 100))).toFixed(1);
  };

  const showArrows = product.images && product.images.length > 1;

  return (
    <Layout>
      <div className={styles.productDetail}>
        <div className={styles.imgList}>
          <button style={{display: showArrows ? 'block' : 'none' }} className={styles.imgListBtn + ' ' + styles.prevBtn} onClick={() => updateImg('prev')}><i className={styles.arrow + ' ' + styles.left}></i></button>
          <img src={activeImg.url} alt={product.title} />
          <button style={{display: showArrows ? 'block' : 'none' }} className={styles.imgListBtn + ' ' + styles.nextBtn} onClick={() => updateImg('next')}><i className={styles.arrow + ' ' + styles.right}></i></button>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>
            <h4>
              {product.title}
            </h4>
            <div className={styles.categoryPill}>{product.category}</div>
          </div>
          <p>{product.description}</p>
          <div className={styles.productPrice}><span className={styles.originalPrice}>&#8377;{product.price}</span> <span className={styles.discountedPrice}>&#8377;{getDiscountedPrice()}</span></div>
          <div className={styles.productRating}>
            &#10029; {product.rating}
          </div>
        </div>
      </div>
    </Layout>
  )
}