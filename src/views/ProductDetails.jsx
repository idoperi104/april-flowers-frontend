import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { productService } from "../services/product.service"
import { loadCategories } from "../store/actions/category.actions"
import {
  addCartItem,
  setIsCartOpen,
  toggleIsOpen,
} from "../store/actions/cart.actions"

export function ProductDetails() {
  const [product, setProduct] = useState(null)

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    loadProduct()
  }, [params.id])

  async function loadProduct() {
    const productId = params.id
    if (productId) {
      try {
        const product = await productService.getById(productId)
        setProduct(product)
      } catch (error) {
        console.log("error:", error)
      }
    }
  }

  function onAddToCart() {
    if (!product.isInStock) return
    dispatch(addCartItem(product))
    dispatch(toggleIsOpen())
  }

  function getBtnTxt() {
    return product.isInStock ? "הוספה לסל" : "אזל המלאי"
  }

  function getIsOutOfSockClass() {
    return product.isInStock ? "" : "out-of-stock"
  }

  return product ? (
    <section className="product-details">
      <div className="info">
        <h2 className="name">{product.name}</h2>
        <h3 className="category">{product.category}</h3>
        <p className="desc">{product.desc}</p>
      </div>
      <div className="actions">
        <h2 className="price">{product.price} ₪</h2>
        <button
          className={`btn-add-to-cart ${getIsOutOfSockClass()}`}
          onClick={onAddToCart}
        >
          {getBtnTxt()}
        </button>
      </div>

      <div className="img-container">
        <img className="img main-img" src={product.imgUrl} alt="" />
        <div className="menu-img">
          <img className="img mini-img" src={product.imgUrl} alt="" />
        </div>
      </div>
    </section>
  ) : (
    <div>loading...</div>
  )
}
