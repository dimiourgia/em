import React from 'react'
import CompanyTopBanner from '../../components/CompanyTopBanner/CompanyTopBanner'
import CompanyTopMessage from '../../components/CompanyTopMessage/CompanyTopMessage'
import CompanyMiddleImage from '../../components/CompanyMiddleImage/CompanyMiddleImage'
import CompanyBottomCard from '../../components/CompanyBottomCard/CompanyBottomCard'


const CompanyPage = () => {
    return (
        <> 
        <div className='min-h-screen'>
           <CompanyTopBanner />
            <CompanyTopMessage />
            <CompanyMiddleImage />
            <CompanyBottomCard /> 
        </div>
            

        </>


    )
}

export default CompanyPage