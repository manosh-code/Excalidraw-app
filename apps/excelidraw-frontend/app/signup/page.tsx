

import {AuthPage} from "@/components/AuthPage";

export default function SignUp(){
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-zinc-50 font-sans dark:bg-black">
            <AuthPage isSignin={false} />
        </div>
    )
}