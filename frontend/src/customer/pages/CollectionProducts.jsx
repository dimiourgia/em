import { useSelector } from "react-redux";
import Card from "../components/Collections/Card"
import { useParams } from "react-router-dom";
import Product from "../components/Product/Product";


export default function(){
    const params = useParams();
    const id = params.id;

    const products = useSelector(state=>state.products);

    return(<>  
        <Product collectionId={id}/>  
    </>)
}