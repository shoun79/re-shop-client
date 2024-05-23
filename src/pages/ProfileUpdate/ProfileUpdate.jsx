import { useState } from "react";
import { getImageUrl } from "../../api/getImageUrl";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import SmallSpinner from "../../components/Spinner/SmallSpinner";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { setAuthToken } from "../../api/auth";
import { useTitle } from "../../hooks/useTitle";
//import { saveUserInfo } from "../../api/user";

const ProfileUpdate = () => {
    const { user, updateUserProfile, loading, setLoading } = useAuth();
    const [showName, setShowName] = useState({})

    useTitle('Profile Update') //for page title

    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.files[0];
        const role = form.role.value;

        try {
            getImageUrl(image)
                .then(imageUrl => {
                    updateUserProfile(name, imageUrl)
                        .then(() => {
                            const userInfo = {
                                email,
                                role
                            }
                            setAuthToken(userInfo)
                            setLoading(false)
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "Profile updated successfully",
                                showConfirmButton: false,
                                timer: 2500
                            })
                            // const userInfo = {
                            //     name,
                            //     email,
                            //     imageUrl,
                            //     role
                            // }
                            ////save user info in db
                            // saveUserInfo(userInfo)
                            //     .then(data => {
                            //         if (data.acknowledged === true) {

                            //         }
                            //     })


                        })
                    //create user
                    // createUser(email, password)
                    //     .then(result => {
                    //         const createdUser = result.user;
                    //         console.log(createdUser);
                    //         updateUserProfile(name, imageUrl)
                    //             .then(() => {
                    //                 const userInfo = {
                    //                     name,
                    //                     email,
                    //                     imageUrl,
                    //                     role
                    //                 }
                    //                 ////save user info in db
                    //                 saveUserInfo(userInfo)
                    //                     .then(data => {
                    //                         console.log(data);
                    //                         if (data.acknowledged === true) {

                    //                             setLoading(false)
                    //                             Swal.fire({
                    //                                 position: "top",
                    //                                 icon: "success",
                    //                                 title: "User created successfully",
                    //                                 showConfirmButton: false,
                    //                                 timer: 2500
                    //                             })
                    //                             navigate(from, { replace: true });
                    //                         }

                    //                     })


                    //             })


                    //     })
                })
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <div className='flex justify-center items-center py-8'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Update Profile</h1>
                    <p className='text-sm text-gray-400'>Update your account</p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-12 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                defaultValue={user?.displayName}
                                type='text'
                                name='name'
                                id='name'
                                required
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>

                            <div className="my-5 flex justify-center">
                                <label className="flex h-full w-max items-end gap-4 rounded-md bg-[#D1793E] px-6 py-4 text-white active:ring-4 active:ring-cyan-200" htmlFor="file">
                                    <svg width={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="Complete"><g id="upload"><g><path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><g><polyline data-name="Right" fill="none" id="Right-2" points="7.9 6.7 12 2.7 16.1 6.7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline><line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="16.3" y2="4.8"></line></g></g></g></g></g>
                                    </svg>
                                    <p className="text-lg font-medium"> {showName.name ? showName.name.length > 15 ? showName.name.slice(0, 15) + '...' : showName.name : 'Upload'}</p>
                                </label>
                                <input onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const imageFile = e.target.files[0];
                                        setShowName(imageFile)
                                    }
                                }} className="hidden" id="file" type="file" name='image' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                defaultValue={user?.email}
                                required
                                type='email'
                                name='email'
                                id='email'
                                disabled
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='text-sm me-4'>
                                Role:
                            </label>
                            <input type="radio" name="role" className="radio" value='buyer' disabled />Buyer
                            <input type="radio" name="role" value='seller' className="radio ml-4" />Seller
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div>
                            <PrimaryBtn
                                type='submit'
                                classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                            >
                                {
                                    loading ? <SmallSpinner></SmallSpinner> : 'Sign up'
                                }
                            </PrimaryBtn>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    );
};

export default ProfileUpdate;