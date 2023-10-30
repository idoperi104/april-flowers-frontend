import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { NavLink } from "react-router-dom"

export function AppFooter() {
  return (
    <footer className="app-footer">
      <p>@ APRIL FLOWERS</p>
      <div className="social">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faInstagram} />
      </div>
    </footer>
  )
}
