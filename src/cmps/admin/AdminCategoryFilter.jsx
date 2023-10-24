import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormRegister } from "../../customHooks/useFormRegister"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export function AdminCategoryFilter({ filterBy, onChangeFilter }) {
  const [register] = useFormRegister({ ...filterBy }, onChangeFilter)

  return (
    <form className="admin-category-filter">
      <div className="search-container">
        <input
          className="input-search"
          placeholder="חיפוש"
          {...register("name", "text")}
        />
        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
      </div>
    </form>
  )
}
