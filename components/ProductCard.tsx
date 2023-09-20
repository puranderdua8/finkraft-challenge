import styles from "./productCard.module.css";
import Link from "next/link";

export default function ProductCard({product}) {
    const getDiscountedPrice = () => {
        const originalPrice = product.price;
        const discount = product.discountPercentage;
        return (originalPrice - (originalPrice * (discount/100))).toFixed(1);
    };
    return (
        <Link className={styles.productCard + ' ' + styles.nextLink} href={`products/${product.id}`}>
            <img src={product.thumbnail} alt={product.title} />
            <div className={styles.productInfo}>
                <h4 className={styles.productTitle}>{product.title}</h4>
                <div className={styles.categoryPill}>{product.category}</div>
                <div className={styles.metaWrapper}>
                    <div className={styles.productPrice}><span className={styles.originalPrice}>&#8377;{product.price}</span> <span className={styles.discountedPrice}>&#8377;{getDiscountedPrice()}</span></div>
                    <div className={styles.productRating}>
                        &#10029; {product.rating}
                    </div>
                </div>
            </div>
        </Link>
    )
}