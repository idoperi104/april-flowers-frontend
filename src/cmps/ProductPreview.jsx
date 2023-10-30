import {
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export function ProductPreview({ product, onAddToCart, size="" }) {
  function getInStock() {
    return product.isInStock ? true : false
  }

  return (
    <li className={`product-preview ${size}`}>
      <button className="btn-bag" onClick={(ev) => {onAddToCart(ev, product)}}>
        <FontAwesomeIcon icon={faCartPlus} />
      </button>
      {getInStock() ? null : (
        <Link to={`/product/${product._id}`}>
          <div className="cover"></div>
          <div className="msg-container">
            <p>אזל המלאי</p>
          </div>
        </Link>
      )}
      <Link className="container" to={`/product/${product._id}`}>
        <img className="preview-img" src={product.imgUrl} alt="" />
        <h2 className="name">{product.name}</h2>
        <p className="category">{product.category}</p>
        <p className="price">{product.price} ₪</p>
      </Link>
    </li>
  )
}
