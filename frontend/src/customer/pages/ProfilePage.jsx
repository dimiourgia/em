// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { getUser } from '../../State/Auth/Action'; // Update with the correct path to your actions file

// const ProfilePage = ({ user, jwt, getUser }) => {
//     useEffect(() => {
//         if (jwt) {
//             getUser(jwt);
//         }
//     }, [jwt, getUser]);

//     return (
//         <div className='mx-auto container mt-[100px]'>
//             {/* PERSONAL INFO */}
//             <div>
//                 <div className='mx-auto w-full md:w-1/3 px-3 md:mb-0 max-w-[520px] tracking-widest font-light text-black text-2xl font-text'>
//                     PERSONAL INFO
//                 </div>
//                 <div className='mx-auto max-w-[520px] mt-[20px]'>
//                     <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             First name
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.firstName || 'N/A'}
//                         </p>
//                     </div>
//                     <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Last name
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.lastName || 'N/A'}
//                         </p>
//                     </div>
//                     <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Email address
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.email || 'N/A'}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className='mt-[30px]'>
//                 <div className='w-full md:w-1/3 px-3 md:mb-0 mx-auto max-w-[520px] tracking-widest font-light text-black text-2xl font-text'>
//                     ADDRESS
//                 </div>
//                 <div className='mx-auto max-w-[520px] mt-[20px]'>
//                     <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             First name
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.addresses || 'N/A'}
//                         </p>
//                     </div>
//                     <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Last name
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.address?.lastName || 'N/A'}
//                         </p>
//                     </div>
//                     <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Address
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.address?.address || 'N/A'}
//                         </p>
//                     </div>
//                     <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                         <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
//                             Apartment
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.address?.apartment || 'N/A'}
//                         </p>
//                     </div>
//                     <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                         <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
//                             City
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.address?.city || 'N/A'}
//                         </p>
//                     </div>
//                     <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                         <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
//                             Zip code
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.address?.zip || 'N/A'}
//                         </p>
//                     </div>
//                     <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                         <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
//                             Phone
//                         </label>
//                         <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight">
//                             {user?.address?.phone || 'N/A'}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const mapStateToProps = (state) => ({
//     user: state.auth.user,
//     jwt: state.auth.jwt,
// });

// const mapDispatchToProps = {
//     getUser,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
