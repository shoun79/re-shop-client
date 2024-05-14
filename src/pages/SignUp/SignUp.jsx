import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import { useAuth } from "../../hooks/useAuth";
import { getImageUrl } from "../../api/getImageUrl";
import Swal from "sweetalert2";
import SmallSpinner from "../../components/Spinner/SmallSpinner";
import { useState } from "react";
import { setAuthToken } from "../../api/auth";

const SignUp = () => {
    const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth();
    const [showName, setShowName] = useState({});
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname || '/';
    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.files[0];
        const password = form.password.value;
        const role = form.role.value;
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter your valid email');
            setLoading(false)
            return;
        }

        if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Ensure Password has one special case letter.');
            setLoading(false)
            return;
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setError('Password should contain at least one upper case')
            setLoading(false)
            return
        }
        else if (password.length < 8) {
            setError('Ensure Password is of length 8.');
            setLoading(false)
            return;
        }
        try {
            getImageUrl(image)
                .then(imageUrl => {
                    //create user
                    createUser(email, password)
                        .then(result => {
                            const createdUser = result.user;
                            console.log(createdUser);
                            updateUserProfile(name, imageUrl)
                                .then(() => {
                                    let userInfo = {
                                        name,
                                        email,
                                        role
                                    }
                                    if (role === 'user') {
                                        userInfo = {
                                            name,
                                            email,

                                        }
                                    }
                                    setError('')
                                    //save user info in db
                                    setAuthToken(userInfo)
                                    setLoading(false)
                                    Swal.fire({
                                        position: "top",
                                        icon: "success",
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 2500
                                    })
                                    navigate(from, { replace: true });


                                })


                        })
                })
        } catch (error) {
            console.log(error);
            setError(error.message)
        }


    }

    //google sign in
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);

                setAuthToken(result.user)
                setLoading(false)
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Successfully Login",
                    showConfirmButton: false,
                    timer: 2500
                })
                navigate(from, { replace: true })



            })
            .catch(err => {
                setLoading(false)
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: err.message,
                    showConfirmButton: false,
                    timer: 2500
                })
                console.log(err.message);
            })

    }
    return (
        <div className='flex justify-center items-center py-8'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Signup</h1>
                    <p className='text-sm text-gray-400'>Create a new account</p>
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
                                required
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div className="relative">
                            <div className='flex justify-between mb-2'>
                                <label htmlFor='password' className='text-sm'>
                                    Password
                                </label>
                            </div>
                            <input
                                type={show ? "text" : "password"}
                                name='password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-green-500 text-gray-900'
                            />
                            <div style={{ position: 'absolute', right: '20px', top: '50%' }}>
                                <p onClick={() => setShow(!show)}>
                                    {
                                        show ? 'Hide' : 'Show'
                                    }
                                </p>
                            </div>
                        </div>
                        {
                            error && <p className="text-red-500"><small>{error}</small></p>
                        }
                        <div>
                            <label htmlFor='password' className='text-sm me-4'>
                                Role:
                            </label>
                            <input type="radio" name="role" value='user' className="radio" defaultChecked />Buyer
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
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Signup with Google
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div className='flex justify-center space-x-4'>
                    <button onClick={handleGoogleSignIn} aria-label='Log in with Google' className='p-3 rounded-sm'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 32 32'
                            className='w-5 h-5 fill-current'
                        >
                            <path d='M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z'></path>
                        </svg>
                    </button>


                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account yet?{' '}
                    <Link to='/login' className='hover:underline text-gray-600'>
                        Sign In
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default SignUp;