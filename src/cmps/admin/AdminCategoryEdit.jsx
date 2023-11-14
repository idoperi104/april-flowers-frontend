import { useNavigate, useParams } from "react-router-dom"
import { categoryService } from "../../services/category.service"
import { useEffect, useRef } from "react"
import { useFormRegister } from "../../customHooks/useFormRegister"
import {
  loadCategories,
  saveCategory,
} from "../../store/actions/category.actions"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { uploadService } from "../../services/upload.service"
import dragImg from "../../assets/imgs/drag.png"

export function AdminCategoryEdit() {
  const [register, category, handleChange, setCategory] = useFormRegister({
    ...categoryService.getEmptyCategory(),
  })

  const dispatch = useDispatch()

  const params = useParams()
  const navigate = useNavigate()
  const inputElement = useRef()
  const fileInputRef = useRef(null)

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
      dispatch(saveCategory(category))
      navigate("/admin/categories")
    } catch (error) {
      console.log("error:", error)
    }
  }

  async function handleFile({ target }) {
    const field = target.name
    const imgUrl = await uploadService.uploadImg(target.files[0])
    setCategory({ ...category, [field]: imgUrl })
  }

  function onClose() {
    navigate("/admin/categories")
  }

  const { imgUrl, themeImgUrl } = category

  return (
    <section className="admin-category-edit">
      <button className="btn btn-close" onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <form className="basic-form" onSubmit={onSaveCategory}>
        <label htmlFor="name">שם הקטגוריה:</label>
        <input {...register("name", "text")} ref={inputElement} />

        <label htmlFor="imgUrl">תמונה:</label>
        <div className="img-uploader">
          <img src={imgUrl || dragImg} alt="" />
          <input
            className="input-img"
            onChange={handleFile}
            // ref={fileInputRef}
            accept="image/*"
            type="file"
            id="imgUrl"
            name="imgUrl"
          />
        </div>

        <label htmlFor="themeImgUrl">תמונת נושא:</label>
        <div className="img-uploader">
          <img src={themeImgUrl || dragImg} alt="" />
          <input
            className="input-img"
            onChange={handleFile}
            // ref={fileInputRef}
            accept="image/*"
            type="file"
            id="themeImgUrl"
            name="themeImgUrl"
          />
        </div>

        <button className="btn-submit">שמור</button>
      </form>
    </section>
  )
}
