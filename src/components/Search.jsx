import { useState } from "react";

function Search({ onSearch }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setUsername(""); // Clear input
    }
  };
const [error, setError] = useState(null);
const fetchUser = async (username) => {
  setLoading(true);
  setUser(null);
  setRepos([]);
  setError(null); // reset error on new fetch

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error("User not found");
    const userData = await userRes.json();
    setUser(userData);

    const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!repoRes.ok) throw new Error("Repos not found");
    const repoData = await repoRes.json();
    setRepos(repoData);

    setRecentSearches((prev) => {
      const updated = [username, ...prev.filter((name) => name !== username)];
      return updated.slice(0, 5);
    });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
