

export function SearchBar({ setSearchClubs }) {
    return (
      <div className="flex items-center justify-center w-full mb-8">
        <input
          type="text"
          placeholder="Search Club"
          onChange={(e) => setSearchClubs(e.target.value)}
          className="w-1/3 p-2 m-4 text-2xl text-center border-2 text-black border-black rounded-lg"
        />
      </div>
    );
}