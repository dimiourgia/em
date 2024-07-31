export default function({text, disabled=false, type='button'}){
    return(
    <div className="form_button_wrapper">
        <button className={disabled? 'button form_button disabled' : 'button form_button'} type={type}>
         {text}  
        </button>
    </div>
    )
}