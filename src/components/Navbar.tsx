const Navbar = () => {
  return (
    <nav className="bg-gunmetal p-4 flex items-center justify-between">
      <h1 className="text-white text-2xl font-bold">Swamp</h1>
      <div className="flex items-center space-x-4">
        <button className="text-2xl p-2 bg-raspberryRose rounded-full text-white">
          +
        </button>
        <button className="bg-amaranthPurple text-white px-4 py-2 rounded">
          Manage
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
