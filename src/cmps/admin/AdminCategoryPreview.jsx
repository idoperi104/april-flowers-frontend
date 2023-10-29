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

export function AdminCategoryPreview({ category, onRemoveCategory }) {
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

      {isExpand ? (
        <div className="expand-container">
          <h4 className="sub-title">תמונה:</h4>
          <img className="img" src={category.imgUrl} alt="" />

          <h4 className="sub-title">תמונת נושא:</h4>
          <img className="img" src={category.themeImgUrl} alt="" />

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
        </div>
      ) : null}
    </li>
  )
}
