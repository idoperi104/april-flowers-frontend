import { useNavigate, useParams } from "react-router-dom"
import { productService } from "../../services/product.service"
import { useEffect, useRef } from "react"
import { useFormRegister } from "../../customHooks/useFormRegister"
import { useDispatch, useSelector } from "react-redux"
import { loadCategories } from "../../store/actions/category.actions"
import { uploadService } from "../../services/upload.service"
import dragImg from "../../assets/imgs/drag.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export function AdminProductEdit() {
  const [register, product, handleChange, setProduct, validation] = useFormRegister({
    ...productService.getEmptyProduct(),
  })

  const categories = useSelector(
    (storeState) => storeState.categoryModule.categories
  )

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)

  useEffect(() => {
    loadProduct()
    dispatch(loadCategories())
  }, [])

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

  async function onSaveProduct(ev) {
    ev.preventDefault()
    validation()
    try {
      await productService.save({ ...product })
      navigate("/admin/products")
    } catch (error) {
      console.log("error:", error)
    }
  }

  async function handleFile({ target }) {
    const imgUrl = await uploadService.uploadImg(target.files[0])
    setProduct({ ...product, imgUrl })
  }

  function onClose() {
    navigate("/admin/products")
  }

  const { imgUrl } = product

  return (
    <section className="admin-product-edit">
      <button className="btn btn-close" onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <form className="basic-form" onSubmit={onSaveProduct}>
        <label htmlFor="name">שם המוצר:</label>
        <input {...register("name", "text")} />

        <label htmlFor="imgUrl">תמונה:</label>
        <button
          className="btn-img-uploader"
          type="button"
          onClick={() => fileInputRef.current.click()}
        >
          Upload an image
        </button>
        <div className="img-uploader">
          <img src={imgUrl || dragImg} alt="" />
          <input
            className="input-img"
            onChange={handleFile}
            ref={fileInputRef}
            accept="image/*"
            type="file"
          />
        </div>

        {/* <label htmlFor="desc">תיאור:</label>
        <input {...register("desc", "text")} /> */}

        <label htmlFor="desc">תיאור:</label>
        <textarea {...register("desc", "text")}></textarea>

        <label htmlFor="category">קטגוריה:</label>
        <select {...register("category", "text")}>
          {categories?.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="price">מחיר:</label>
        <input {...register("price", "number")} />

        <label htmlFor="isInStock">קיים במלאי?</label>
        <input
          className="input-checkbox"
          {...register("isInStock", "checkbox")}
          checked={product.isInStock}
        />

        <button className="btn-submit">Save</button>
      </form>
    </section>
  )
}
