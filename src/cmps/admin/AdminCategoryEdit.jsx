import { useNavigate, useParams } from "react-router-dom"
import { categoryService } from "../../services/category.service.local"
import { useEffect, useRef } from "react"
import { useFormRegister } from "../../customHooks/useFormRegister"
import { loadCategories } from "../../store/actions/category.actions"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export function AdminCategoryEdit() {
  const [register, category, handleChange, setCategory] = useFormRegister({
    ...categoryService.getEmptyCategory(),
  })

  const dispatch = useDispatch()

  const params = useParams()
  const navigate = useNavigate()
  const inputElement = useRef()
  
  useEffect(() => {
    loadCategory()
    focusInput()
  }, [params.id])

  function focusInput() {
    inputElement.current.focus()
  }

  async function loadCategory() {
    const categoryId = params.id
    if (categoryId) {
      try {
        const category = await categoryService.getById(categoryId)
        setCategory(category)
      } catch (error) {
        console.log("error:", error)
      }
    } else {
      const category = categoryService.getEmptyCategory()
      setCategory(category)
    }
  }

  async function onSaveCategory(ev) {
    ev.preventDefault()
    try {
      await categoryService.save({ ...category })
      dispatch(loadCategories())
      navigate("/admin/categories")
    } catch (error) {
      console.log("error:", error)
    }
  }

  function onClose() {
    navigate("/admin/categories")
  }

  return (
    <section className="admin-category-edit">
      <button className="btn btn-close" onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <form className="basic-form" onSubmit={onSaveCategory}>
        <label htmlFor="name">
          שם הקטגוריה:
        </label>
        <input {...register("name", "text")} ref={inputElement} />

        <button>שמור</button>
      </form>
    </section>
  )
}
