import React from 'react'

const VideoMiddle = () => {
    return (
        <>
            <div className="relative mt-[100px]">
                <video className="w-full" controls>
                    <source src="images/28.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

        </>
    )
}

export default VideoMiddle