"use client";

export function AuthPage({isSignin}:{
    isSignin: boolean
}) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-slate-900 to-purple-950 p-4">
  <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

    {/* Title */}
    <h1 className="text-3xl font-bold text-white text-center">
      {isSignin ? "Welcome Back " : "Join Us "}
    </h1>

    <p className="text-gray-300 text-center mt-2">
      {isSignin ? "Sign in to continue" : "Create a new account"}
    </p>

    {/* Form */}
    <div className="mt-8 space-y-4">

      {/* Username */}
      <div>
        <label className="text-gray-300 text-sm font-medium">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="mt-2 w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-400 
                     border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Password */}
      <div>
        <label className="text-gray-300 text-sm font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="mt-2 w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-400 
                     border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Button */}
      <button
        onClick={() => {
          const endpoint = isSignin
            ? "http://localhost:3000/api/v1/user/signin"
            : "http://localhost:3000/api/v1/user/signup";

          console.log("Endpoint:", endpoint);
        }}
        className="w-full mt-4 p-3 rounded-xl font-semibold text-white 
                   bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
                   hover:scale-[1.02] transition duration-200 shadow-lg shadow-purple-500/30"
      >
        {isSignin ? "Sign In" : "Sign Up"}
      </button>
    </div>

    {/* Endpoint Reference */}
    



  </div>
</div>

         
    );
}
