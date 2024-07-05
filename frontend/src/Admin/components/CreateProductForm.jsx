import { useState } from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../../State/Product/Action";
import { useNavigate } from "react-router-dom";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
  { name: "XL", quantity: 0 },
  { name: "2XL", quantity: 0 },
];

const initialImageUrls = ["", "", "", "", ""];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: initialImageUrls,
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    size: initialSizes,
    category: "",
    description: "",
    fabricDescription: "", // Added fabricDescription
    modelAttireDescription: "", // Added modelAttireDescription
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name === "size_quantity" ? "quantity" : name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleImageUrlChange = (e, index) => {
    const { value } = e.target;
    const imageUrls = [...productData.imageUrl];
    imageUrls[index] = value;
    setProductData((prevState) => ({
      ...prevState,
      imageUrl: imageUrls,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    navigate("/admin/products");
  };

  return (
    <div className="p-10">
      <Typography variant="h4" sx={{ textAlign: "center" }} className="py-4">
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit} className="min-h-screen" noValidate>
        <Grid container spacing={2}>
          {productData.imageUrl.map((url, index) => (
            <Grid item xs={12} key={`imageUrl-${index}`}>
              <TextField
                fullWidth
                label={`Image URL ${index + 1}`}
                name={`imageUrl-${index}`}
                value={url}
                onChange={(e) => handleImageUrlChange(e, index)}
                required
              />
            </Grid>
          ))}
          {[
            "brand",
            "title",
            "color",
            "price",
            "discountedPrice",
            "category",
            "fabricDescription", // Added fabricDescription
            "modelAttireDescription", // Added modelAttireDescription
          ].map((field, index) => (
            <Grid item xs={12} sm={index % 2 === 0 ? 12 : 12} key={field}>
              <TextField
                fullWidth
                label={
                  field === "fabricDescription"
                    ? "Fabric Description"
                    : field === "modelAttireDescription"
                    ? "Model Attire Description"
                    : field.charAt(0).toUpperCase() +
                      field.slice(1).replace(/([A-Z])/g, " $1").trim()
                }
                name={field}
                value={productData[field]}
                onChange={handleChange}
                multiline={field === "fabricDescription" || field === "modelAttireDescription"}
                rows={3}
                type={["price", "discountedPrice"].includes(field) ? "number" : "text"}
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
              required
            />
          </Grid>
          {productData.size.map((size, index) => (
            <Grid container item spacing={3} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  value={size.quantity}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" sx={{ p: 1.8 }} className="py-20" size="large" type="submit">
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
