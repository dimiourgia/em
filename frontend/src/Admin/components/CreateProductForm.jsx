import { useEffect, useState } from "react";
import { Typography, Grid, TextField, Button, Select, MenuItem, InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../../State/Product/Action";
import { useNavigate } from "react-router-dom";
import FileUploader from "../../customer/components/FileUploader/Index";
import SelectInput from "@mui/material/Select/SelectInput";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
  { name: "XL", quantity: 0 },
  { name: "2XL", quantity: 0 },
];


const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: [],
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    size: initialSizes,
    description: "",
    material: "",
    modelAttireDescription: "",
    SKU: "",
    neck_type: "", 
    sleeve_style: "", 
    collectionName: "Radiant Rebellion",
    defaultImageIndex: 0,
  });

  useEffect(()=>{
    console.log(productData, 'product data');
  },[productData])

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
  };

  const handleImageSelect = (index) => {
    setProductData(pre=>({
      ...pre,
      defaultImageIndex:index
    }))
  };

  return (
    <div className="p-10">
      <Typography variant="h4" sx={{ textAlign: "center" }} className="py-4">
        Add New Product
      </Typography>

      <FileUploader updateImageUrls={setProductData} />

      {productData?.imageUrl && productData?.imageUrl.length > 0 && <div className="mt-10 mb-4">
        <div className="">Pick cover image</div>
          <div className="px-4 py-2 w-full flex gap-2">
            {productData.imageUrl.map((url,index)=>
              <img
              key={index}
              src={`${url}@lq`}
              className={`w-24 cursor-pointer ${productData.defaultImageIndex === index ? 'border-2 border-blue-500' : ''}`}
              onClick={() => handleImageSelect(index)}
            />
            )}
          </div>
        </div>
        }

      <form onSubmit={handleSubmit} className="min-h-screen mt-4" noValidate>
        <Grid container spacing={2}>

          {[
            "brand",
            "title",
            "color",
            "price",
            "discountedPrice",
            "material",
            "modelAttireDescription",
            "SKU",
            "neck_type", 
            "sleeve_style",
          ].map((field, index) => (
            <Grid item xs={12} sm={index % 2 === 0 ? 12 : 12} key={field}>
              <TextField
                fullWidth
                label={
                  field === "material"
                    ? "Material"
                    : field === "modelAttireDescription"
                    ? "Model Attire Description"
                    : field === "SKU"
                    ? "SKU"
                    : field === "neck_type"
                    ? "Neck Type"
                    : field === "sleeve_style"
                    ? "Sleeve Style"
                    : field === "collections"
                    ? "Select Collection Name"
                    : field.charAt(0).toUpperCase() +
                      field.slice(1).replace(/([A-Z])/g, " $1").trim()
                }
                name={field}
                value={productData[field]}
                onChange={handleChange}
                multiline={field === "material" || field === "modelAttireDescription"}
                rows={1}
                type={["price", "discountedPrice"].includes(field) ? "number" : "text"}
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
              <InputLabel id="collection-select-label">Select Collection</InputLabel>
              <Select
                className="w-full"
                labelId="collection-select-label"
                id="collection-select"
                value={productData.collectionName}
                label="Select Collection"
                name='Select Collection'
                onChange={(e)=>{setProductData(pre=>({...pre, collectionName: e.target.value}))}}
                required
              >
              <MenuItem value={'Radiant Rebellion'}>Radiant Rebellion</MenuItem>
              <MenuItem value={'Empowered Ember'}>Empowered Ember</MenuItem>
              <MenuItem value={'Minted Resolve'}>Minted Resolve</MenuItem>
              <MenuItem value={'Eclipsed'}>Eclipsed</MenuItem>
              <MenuItem value={'Stripes of Strength'}>Stripes of Strength</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              name="description"
              rows={4}
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
