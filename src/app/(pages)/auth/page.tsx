import Link from "next/link";

const Auth = () => {
    return (
        <div className={'flex items-center flex-col gap-3'}>
            <h1 className={'text-3xl'}>Auth Page</h1>
            <div
                className={'bg-blue-800 w-[400px] h-[200px] rounded-2xl p-4 flex flex-col items-center justify-center gap-3'}>
                <Link href={'/auth/signup'} className={'bg-gray-950 p-2 rounded-2xl w-[50%] text-center'}>Sign
                    Up</Link>
                <Link href={'/auth/signIn'} className={'bg-gray-950 p-2 rounded-2xl w-[50%] text-center'}>Sign
                    In</Link>
            </div>
        </div>
    )
}

export default Auth;