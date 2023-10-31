import { NavLink } from "react-router-dom"
import heroImg from "../assets/imgs/hero.jpeg"
import { CategoryIndex } from "../cmps/CategoryIndex"
import { ProductIndexWrapper } from "../cmps/ProductIndexWrapper"
import { ProductIndexFromService } from "../cmps/ProductIndexFromService"

export function HomePage() {
  function getStyle() {
    return {
      backgroundImage: `url(${heroImg})`,
    }
  }

  return (
    <section className="home-page full main-layout">
      <div className="hero-container full" style={getStyle()}>
        <div className="cover"></div>
        <div className="content">
          <h3 className="sub-title">פרחי אפריל מציגה</h3>
          <h2 className="title">קולקצית פרחים 2023</h2>
          <NavLink className="link-hero" to={"/collection"}>
            <button className="btn-hero">קנה עכשיו</button>
          </NavLink>
        </div>
      </div>

      {/* <h2 className="title">מה אתם מחפשים?</h2> */}
      <CategoryIndex />

      <div className="intro-container">
        <h2 className="title">פרחי אפריל - חנות פרחים שמתמחה בתרגום מילים לפרחים</h2>
        <p className="text">
          חנות פרחים משפחתית שנוסדה בשנת 1995. אצלינו השרות עם חיוך ואחריות.
          הכוונה שלנו היא להשפיע על השפעות חיוביות להעשיר את חייהם של אחרים,
          סביבות עבודה וקהילות באמצעות אוסף אמנות פרחוני המעוצב במומחיות שלנו.
        </p>
      </div>

      <ProductIndexWrapper
        title="הנמכרים ביותר"
        filterBy={{ sort: "salesAmount", amount: 6 }}
      />

      {/* <ProductIndexFromService
        title="טעימה מזרי הפרחים..."
        filterBy={{ category: "זרי פרחים", amount: 6 }}
        size="small"
      /> */}

      <ProductIndexFromService
        title="מחפשים רהיט חדש?"
        filterBy={{ category: "מעמדי פרחים", amount: 6 }}
        size="small"
      />

      {/* <ProductIndexFromService
        title="קצת מזרי הפרחים..."
        filterBy={{ category: "זרי פרחים", amount: 4 }}
      /> */}
    </section>
  )
}
