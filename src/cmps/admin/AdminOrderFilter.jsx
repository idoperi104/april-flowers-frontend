import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormRegister } from "../../customHooks/useFormRegister"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

export function AdminOrderFilter({ filterBy, onChangeFilter }) {
  const [register] = useFormRegister({ ...filterBy }, onChangeFilter)

  const categories = useSelector(
    (storeState) => storeState.categoryModule.categories
  )

  return (
    <form className="admin-product-filter">
      <div className="search-container">
        <input
          className="input-search"
          placeholder="שם המזמין"
          {...register("name", "text")}
        />
        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
      </div>

      <div>
        <label htmlFor="shipped">נשלח:</label>
        <select {...register("shipped", "text")}>
          <option value="">הכל</option>
          <option value="shipped">נשלח</option>
          <option value="notShipped">לא נשלח</option>
        </select>
      </div>

      <div>
        <label htmlFor="paid">שולם:</label>
        <select {...register("paid", "text")}>
          <option value="">הכל</option>
          <option value="paid">שולם</option>
          <option value="notPaid">לא שולם</option>
        </select>
      </div>
    </form>
  )
}
