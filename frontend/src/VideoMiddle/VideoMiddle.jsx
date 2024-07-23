import React from 'react'

const VideoMiddle = () => {
    return (
        <>
            <div className="relative mt-[100px]">
                <video className="w-full w-full h-[100vh] bg-black" autoPlay loop muted>
                    <source src="images/Gabi-movement-transition.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

        </>
    )
}

export default VideoMiddle