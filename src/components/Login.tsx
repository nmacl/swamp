const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-silver">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-gunmetal text-xl font-bold mb-4">Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <button className="bg-amaranthPurple text-white w-full p-2 rounded-lg shadow-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
