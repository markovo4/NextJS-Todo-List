import Link from "next/link";

const Auth = () => {
    return (
        <div className='flex flex-col items-center gap-10 pt-10'>
            <h1 className='text-center text-3xl font-bold'>Auth Page</h1>
            <div className='bg-gray-500 w-[400px] h-[180px] flex justify-center items-center rounded-2xl'>
                <div
                    className={'flex flex-col items-center gap-3'}>
                    <Link href={'/auth/signup'}
                          className={'text-center bg-blue-100 hover:bg-gray-300 transition text-black w-[224px] rounded-md mt-2 py-1'}
                    >Sign
                        Up</Link>
                    <Link href={'/auth/signIn'}
                          className={'text-center bg-blue-100 hover:bg-gray-300 transition text-black w-[224px] rounded-md mt-2 py-1'}>Sign
                        In</Link>
                </div>
            </div>
        </div>
    )
}

export default Auth;