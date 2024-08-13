export default function({shopTitle, onClick}){
    return(<>
        <button 
            onClick={onClick} 
            className="bg-white tracking-widest font-roboto text-sm hover:bg-heading-bg text-gray-800 py-2 px-4 border border-[#FCAF3C]">
            {shopTitle}
        </button>
    </>)
}