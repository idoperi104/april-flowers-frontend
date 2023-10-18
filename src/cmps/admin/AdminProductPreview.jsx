import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { NavLink } from "react-router-dom"
// import { Link } from "react-router-dom"

export function AdminProductPreview({ product, onRemoveProduct, onUpdateProductKeyVal }) {
  function getIsInStockClass() {
    return product.isInStock ? "green" : "red"
  }

  return (
    <li className="admin-product-preview">
      <img className="preview-img" src={product.imgUrls[0]} alt="" />
      <h4>{product.name}</h4>
      <button className={`btn-in-stock ${getIsInStockClass()}`} onClick={() => onUpdateProductKeyVal(product, "isInStock", !product.isInStock)} >{product.isInStock ? "במלאי" : "אזל המלאי"}</button>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <div className="actions">
        <button onClick={() => onRemoveProduct(product._id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <NavLink to={`/admin/products/edit/${product._id}`}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </NavLink>
      </div>
    </li>
  )
}
