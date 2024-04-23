import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useProducts } from "../context/productsContext";  // Updated to useProducts
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function ProductFormPage() {  // Renamed to ProductFormPage
  const { createProduct, getProduct, updateProduct } = useProducts();  // Updated to product functions
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateProduct(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createProduct({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }
      navigate("/products"); 
    } catch (error) {
      console.log(error);
      window.location.href = "/";  
    }
  };

  useEffect(() => {
    const loadProduct = async () => {  
      if (params.id) {
        const product = await getProduct(params.id);  
        setValue("title", product.title);
        setValue("description", product.description);
        setValue(
          "date",
          product.date ? dayjs(product.date).utc().format("YYYY-MM-DD") : ""
        );
        
      }
    };
    loadProduct();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Save</Button>
      </form>
    </Card>
  );
}
