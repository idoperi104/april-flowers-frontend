import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormRegister } from "../../customHooks/useFormRegister"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

export function AdminProductFilter({ filterBy, onChangeFilter }) {
  const [register] = useFormRegister({ ...filterBy }, onChangeFilter)

  const categories = useSelector(
    (storeState) => storeState.categoryModule.categories
  )

  return (
    <form className="admin-product-filter">
      <div className="search-container">
        <input
          className="input-search"
          placeholder="חיפוש"
          {...register("name", "text")}
        />
        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
      </div>

      <div>
        <label htmlFor="category">קטגוריה:</label>
        <select {...register("category", "text")}>
          {categories?.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
          <option value="">כל הקטגוריות</option>
        </select>
      </div>

      <div>
        <label htmlFor="stock">מלאי:</label>
        <select {...register("stock", "text")}>
          <option value="">הכל</option>
          <option value="inStock">במלאי</option>
          <option value="outOfStock">מחוץ למלאי</option>
        </select>
      </div>
    </form>
  )
}
