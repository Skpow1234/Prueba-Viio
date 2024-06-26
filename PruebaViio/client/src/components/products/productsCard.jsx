import { useProducts } from "../../context/productsContext";
import { Button, ButtonLink, Card } from "../ui";

export function ProductCard({ product }) {
  const { deleteProduct } = useProducts();  // Updated to useProducts and deleteProduct

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteProduct(product._id)}>Delete</Button>
          <ButtonLink to={`/products/${product._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{product.description}</p>
      {/* Format date */}
      <p>
        {product.date &&
          new Date(product.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
