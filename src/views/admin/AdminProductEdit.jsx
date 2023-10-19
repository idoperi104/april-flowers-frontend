import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "../../customHooks/useForm"
import { productService } from "../../services/product.service.local"
import { useEffect } from "react"
import { useFormRegister } from "../../customHooks/useFormRegister"
import { Value } from "sass"

export function AdminProductEdit() {
  const [register, product, handleChange, setProduct] = useFormRegister({
    ...productService.getEmptyProduct(),
  })

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadProduct()
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
    try {
      await productService.save({ ...product })
      navigate("/admin/products")
    } catch (error) {
      console.log("error:", error)
    }
  }

  return (
    <section className="admin-product-edit">
      <h1>{product._id ? "Edit" : "Add"} Product</h1>
      <form className="flex column" onSubmit={onSaveProduct}>
        <label htmlFor="name">name</label>
        <input {...register("name", "text")} />

        <label htmlFor="desc">desc</label>
        <input {...register("desc", "text")} />

        <label htmlFor="category">category</label>
        <input {...register("category", "text")} />

        <label htmlFor="price">price</label>
        <input {...register("price", "number")} />

        <label htmlFor="isInStock">is In Stock</label>
        <input
          {...register("isInStock", "checkbox")}
          checked={product.isInStock}
        />

        <label htmlFor="isSeveralSizes">is Several Sizes</label>
        <input
          {...register("isSeveralSizes", "checkbox")}
          checked={product.isSeveralSizes}
        />

        <button>Save</button>
      </form>
    </section>
  )
}
