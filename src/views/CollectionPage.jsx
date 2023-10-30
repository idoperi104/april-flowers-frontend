import { CategoryIndex } from "../cmps/CategoryIndex"
import { ProductIndex } from "./ProductIndex"

export function CollectionPage() {
  return (
    <section className="collection-page full main-layout">
      <CategoryIndex/>
      <h2 className="title">המוצרים שלנו</h2>
      <ProductIndex />
    </section>
  )
}
