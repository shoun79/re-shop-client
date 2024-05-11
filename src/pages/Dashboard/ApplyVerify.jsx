import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getVerifyStatus, sendRequest } from "../../api/user";
import { getImageUrl } from "../../api/getImageUrl";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import SmallSpinner from "../../components/Spinner/SmallSpinner";
import Spinner from "../../components/Spinner/Spinner";

const ApplyVerify = () => {
    const { user } = useAuth();
    const [verify, setVerify] = useState(null);
    const [loading, setLoading] = useState(true);
    const [previewImg, setPreviewImg] = useState('');
    useEffect(() => {
        setLoading(true)
        getVerifyStatus(user?.email)
            .then(data => {
                setVerify(data)
                setLoading(false)
            })
    }, [user?.email]);
    console.log(verify);

    const handleSubmit = async event => {
        event.preventDefault();
        const form = event.target;
        const location = form.location.value;
        const image = form.image.files[0];
        setLoading(true)
        const imageURL = await getImageUrl(image);
        if (imageURL) {
            const hostData = {
                location,
                documentImg: imageURL,
                verify: 'requested',
                email: user?.email,
            }

            sendRequest(hostData)
                .then(data => {
                    console.log(data);
                    setVerify('requested')
                    setLoading(false)
                }).catch(err => console.log(err))
        }



    }
    const handleImageChange = image => {
        setPreviewImg(window.URL.createObjectURL(image))

    }
    return (
        <>

            {loading ? <Spinner></Spinner> : verify ? (
                <div className='h-screen text-gray-600 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
                    {verify === 'verified' ? 'Now you are a verified seller' : 'Request Sent, wait for admin approval'}

                </div>
            ) : (
                <>
                    {
                        loading ? <Spinner></Spinner> :

                            <div className='flex justify-center mt-6'>
                                <div className='w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl bg-gray-50'>
                                    <form
                                        onSubmit={handleSubmit}
                                        className='space-y-6 ng-untouched ng-pristine ng-valid'
                                    >
                                        <div className='space-y-1 text-sm'>
                                            <label htmlFor='location' className='block text-gray-600'>
                                                Location
                                            </label>
                                            <input
                                                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                                                name='location'
                                                id='location'
                                                type='text'
                                                placeholder='Location'
                                                required
                                            />
                                        </div>

                                        <p>Upload ID Document</p>

                                        <div className='flex space-x-4 items-center'>
                                            <label
                                                htmlFor='image'
                                                className='p-3 text-center rounded-md cursor-pointer text-gray-500 font-bold border  border-green-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 hover:border-white hover:text-white'
                                            >
                                                <input
                                                    onChange={e => handleImageChange(e.target.files[0])}
                                                    type='file'
                                                    name='image'
                                                    id='image'
                                                    accept='image/*'
                                                    hidden
                                                />
                                                {previewImg && <img src={previewImg} alt='preview image' className='w-20 h-16' />}
                                            </label>
                                        </div>

                                        <div>
                                            <label className='flex items-center'>
                                                <input type='checkbox' className='form-checkbox' required />
                                                <span className='block ml-2 text-xs font-medium text-gray-700 cursor-pointer'>
                                                    Agree to Privacy Policy
                                                </span>
                                            </label>
                                        </div>
                                        <PrimaryBtn>{loading ? <SmallSpinner /> : 'Submit Request'}</PrimaryBtn>

                                    </form>
                                </div>
                            </div>

                    }

                </>



            )}
        </>
    );
};

export default ApplyVerify;