export default function Button({ text, disabled = false, type = 'button', classname, onClick, imageSrc}) {

    const handleClick = ()=> {
        console.log('button clicked')
        if(onClick){
            console.log('on click handler present')
            onClick();
        }
    }

    return (
        <div className="form_button_wrapper mt-4">
            <button
                onClick={handleClick}
                className={`text-white min-w-[164px] h-[48px] no-underline rounded-sm border border-transparent text-[1em] p-[.15em] font-medium leading-[1.3] font-sans bg-[#fcaf3c] cursor-pointer transition-colors duration-250 ease-in-out hover:border-[#948368] focus:outline-none disabled:bg-[#edc589] disabled:cursor-not-allowed ${classname}`}
                type={type}
                disabled={disabled}
            >
                <div className="flex justify-center items-center gap-2">
                    {imageSrc && <img src={imageSrc} />}
                    {text}
                </div>
            </button>
        </div>
    );
}