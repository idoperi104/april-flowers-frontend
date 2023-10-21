import {
  faCaretDown,
  faCaretUp,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
// import { Link } from "react-router-dom"

export function AdminCategoryPreview({
  category,
  onRemoveCategory,
  onUpdateCategoryKeyVal,
}) {
  const [isExpand, setIsExpand] = useState(false)

  //   useEffect(() => {}, [isExpand])

  function toggleIsExpand() {
    setIsExpand((prevIsExpand) => !prevIsExpand)
  }

  return (
    <li className="admin-category-preview" onClick={toggleIsExpand}>
      <div className="title">
        <h3 className="name">{category.name}</h3>
        <FontAwesomeIcon
          className="icon"
          icon={isExpand ? faCaretUp : faCaretDown}
        />
      </div>
      {/* {isExpand ? (
        <ul className="sub-categories">
          {category.subCategories.map((subCategory, idx) => (
            <li key={idx} className="sub-category">
              <span>{subCategory}</span>
            </li>
          ))}
        </ul>
      ) : null} */}
      {isExpand ? (
        <div className="actions">
          <button
            className="btn btn-remove"
            onClick={(ev) => {
              ev.stopPropagation()
              onRemoveCategory(category._id)
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <NavLink
            className="btn-link"
            to={`/admin/categories/edit/${category._id}`}
          >
            <button className="btn">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </NavLink>
        </div>
      ) : null}
    </li>
  )
}
