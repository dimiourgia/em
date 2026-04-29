import { useSelector } from "react-redux";
import Card from "../components/Collections/Card"
import { useParams } from "react-router-dom";
import Product from "../components/Product/Product";

//commenting just to redeploy


export default function(){
    const params = useParams();
    const id = params.id;

    return(<>  
        <Product collectionId={id}/>  
    </>)
}
