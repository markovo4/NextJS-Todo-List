import SignInForm from "@/components/forms/auth/SignIn.form";

const SignIn = () => {
    return (
        <div className='flex items-center flex-col '>
            <h1 className='text-center text-3xl font-bold py-20'>Sign In</h1>
            <div className='bg-gray-500 w-[400px] h-[300px] flex justify-center items-center rounded-2xl'>
                <SignInForm/>
            </div>
        </div>
    )
}

export default SignIn;