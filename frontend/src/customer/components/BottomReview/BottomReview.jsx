import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import GradeIcon from '@mui/icons-material/Grade';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};


const reviews = [
    {
        "reviewHighlight": "Absolutely stunning!",
        "review": "The Empowered Aura Dressa is perfect for a sunny day out. The fit is flattering, and the smocked detailing adds a nice touch. It pairs beautifully with sandals or heels.",
        "user": {
            "name": "Priya",
            "location": "Jaipur"
        }
    },
    {
        "reviewHighlight": "Perfect summer dress!",
        "review": "I love the bright color and comfortable fabric of the Empowered Aura Dressa. It’s great for casual outings and easy to dress up with accessories.",
        "user": {
            "name": "Kavya",
            "location": "Noida"
        }
    },
    {
        "reviewHighlight": "Versatile and stylish!",
        "review": "The Minted Resolve Collection has something for every occasion. The designs are chic and the quality is impressive. I’ve received so many compliments already!",
        "user": {
            "name": "Ravina",
            "location": "Delhi"
        }
    },
    {
        "reviewHighlight": "Great collection!",
        "review": "I recently purchased a few pieces from the Minted Resolve Collection and I am thrilled with my choices. The fabrics are soft and the colors are vibrant. Highly recommend!",
        "user": {
            "name": "Sanya",
            "location": "Gurugram"
        }
    },
    {
        "reviewHighlight": "Chic and comfortable!",
        "review": "The Apricot Aura Shirt is a must-have. It’s perfect for both work and casual wear. The fit is just right and the material is breathable.",
        "user": {
            "name": "Anika",
            "location": "Dehradun"
        }
    },
    {
        "reviewHighlight": "Stylish and elegant!",
        "review": "I love how the Apricot Aura Shirt fits. The buttons add a nice touch and it pairs well with both jeans and skirts. Perfect addition to my wardrobe!",
        "user": {
            "name": "Saumya",
            "location": "Noida"
        }
    }
]

const items = [
    // 1

];


const Review = ({review}) => {

    return (
        <div className="relative hover:shadow-xl min-h-[300px] mt-[20px] border border-gray-200 rounded-lg m-[20px] bg-[#fffffe]" data-value="1">
            
            <div className='w-full px-3 md:mb-0'>
                <div className="flex justify-center items-center p-4 ">
                    <p className="p-2 px-4 group font-roboto font-semibold"  >
                        {review.reviewHighlight}
                    </p>
                </div>
                
                <p className='font-roboto text-center text-base text-gray-800'>
                    {review.review}
                </p>

                <p className='font-text text-center text-lg  text-black mt-[30px] '>
                    {`${review.user.name}, ${review.user.location}`}
                </p>
            </div>

            <div className='flex w-full justify-center mt-4 text-center pt-[30px]'>
                {Array.from({ length: 5 }, (_, index) => (
                    <GradeIcon className='text-[#FCAF3C]' key={index} />
                ))}
            </div>

        </div>)
}

const BottomReview = () => (<div className='mb-24'>
    <div className='w-full flex items-cetner justify-center text-xl sm:text-2xl'>What our customers say about us</div>
    <AliceCarousel responsive={responsive} infinite autoPlayInterval={2000} autoPlay={true} items={reviews.map(review=><Review review={review}/>)} key='review_carousel'/>   
</div>);


export default BottomReview;
