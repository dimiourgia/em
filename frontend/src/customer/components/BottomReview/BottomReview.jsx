import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import GradeIcon from '@mui/icons-material/Grade';
import CarouselComponent from '../Carousel/Index';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};


const reviews = [
    {
        "reviewHighlight": "Absolutely stunning!",
        "review": "The Sunny Day Smocked Dress is perfect for a sunny day out. The fit is flattering, and the smocked detailing adds a nice touch. It pairs beautifully with sandals or heels.",
        "user": {
            "name": "Priya",
            "location": "Jaipur"
        }
    },
    {
        "reviewHighlight": "Perfect summer dress!",
        "review": "I love the bright color and comfortable fabric of the Sunny Day Smocked Dress. It’s great for casual outings and easy to dress up with accessories.",
        "user": {
            "name": "Kavya",
            "location": "Mumbai"
        }
    },
    {
        "reviewHighlight": "Versatile and stylish!",
        "review": "The Minted Resolve Collection has something for every occasion. The designs are chic and the quality is impressive. I’ve received so many compliments already!",
        "user": {
            "name": "Rahul",
            "location": "Delhi"
        }
    },
    {
        "reviewHighlight": "Great collection!",
        "review": "I recently purchased a few pieces from the Minted Resolve Collection and I am thrilled with my choices. The fabrics are soft and the colors are vibrant. Highly recommend!",
        "user": {
            "name": "Sanya",
            "location": "Bangalore"
        }
    },
    {
        "reviewHighlight": "Chic and comfortable!",
        "review": "The Citrus Breeze Button-Up Blouse is a must-have. It’s perfect for both work and casual wear. The fit is just right and the material is breathable.",
        "user": {
            "name": "Anika",
            "location": "Chennai"
        }
    },
    {
        "reviewHighlight": "Stylish and elegant!",
        "review": "I love how the Citrus Breeze Button-Up Blouse fits. The buttons add a nice touch and it pairs well with both jeans and skirts. Perfect addition to my wardrobe!",
        "user": {
            "name": "Saumya",
            "location": "Hyderabad"
        }
    }
]

const items = [
    // 1

];


const Review = ({review}) => {

    return (
        <div className="item hover:shadow-xl min-h-[300px]  mt-[100px] mb-[50px] border border-gray-200 rounded-lg m-[10px] " data-value="1">
            <div className='text-center pt-[30px]'>
                <GradeIcon />
                <GradeIcon />
                <GradeIcon />
                <GradeIcon />
                <GradeIcon />
            </div>
            <div className='w-full md:w-1/3 px-3 md:mb-0'>
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

        </div>)
}

const BottomReview = () => (
    <CarouselComponent showControls={false} autoplay={true} items={reviews.map(review=><Review review={review}/>)} key='review_carousel' isDummy={false} />
);


export default BottomReview;
