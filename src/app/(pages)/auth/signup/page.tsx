import SignUpForm from "@/components/forms/auth/SignUp.form";

const SignUp = () => {
    return (
        <div className='flex items-center flex-col '>
            <h1 className='text-center text-3xl font-bold py-20'>Sign Up</h1>
            <div className='bg-gray-500 w-[400px] h-[350px] flex justify-center items-center rounded-2xl'>
                <SignUpForm/>
            </div>
        </div>
    )
}

export default SignUp;