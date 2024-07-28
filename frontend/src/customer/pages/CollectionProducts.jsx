import Card from "../components/Collections/Card"
import { useParams } from "react-router-dom";


export default function(){
    const params = useParams();
    const id = params.id;

    return(<>
        <div>{id}</div>    
    </>)
}