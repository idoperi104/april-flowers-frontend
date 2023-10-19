import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "../../customHooks/useForm"
import { categoryService } from "../../services/category.service.local"
import { useEffect } from "react"
import { useFormRegister } from "../../customHooks/useFormRegister"
import { Value } from "sass"

export function AdminCategoryEdit() {
  const [register, category, handleChange, setCategory] = useFormRegister({
    ...categoryService.getEmptyCategory(),
  })

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadCategory()
  }, [])

  async function loadCategory() {
    const categoryId = params.id
    if (categoryId) {
      try {
        const category = await categoryService.getById(categoryId)
        setCategory(category)
      } catch (error) {
        console.log("error:", error)
      }
    }
  }

  async function onSaveCategory(ev) {
    ev.preventDefault()
    try {
      await categoryService.save({ ...category })
      navigate("/admin/categories")
    } catch (error) {
      console.log("error:", error)
    }
  }

  const { name, subCategories } = category

  return (
    <section className="admin-category-edit">
      <h1>{category._id ? "Edit" : "Add"} Category</h1>
      <form className="flex column" onSubmit={onSaveCategory}>
        <label htmlFor="name">name</label>
        <input {...register("name", "text")} />

        <button>Save</button>
      </form>
    </section>
  )
}
