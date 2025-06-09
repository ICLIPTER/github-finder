import { useState } from "react";
import Search from "./components/search";
import UserCard from "./components/userCard";
import RepoList from "./components/RepoList";
import Loading from "./components/Loading";


function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const fetchUser = async (username) => {
    setLoading(true);
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");
      const userData = await userRes.json();
      setUser(userData);

      const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!repoRes.ok) throw new Error("Repos not found");
      const repoData = await repoRes.json();
      setRepos(repoData);

      // Add to recent searches
      setRecentSearches((prev) => {
        const updated = [username, ...prev.filter((name) => name !== username)];
        return updated.slice(0, 5); // Keep only last 5 unique entries
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
    
  };
  

function App() {
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" || false;
  });

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  // Your fetchUser and other states here ...

  // rest of your app code
}

  

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">GitHub Finder</h1>
      <Search onSearch={fetchUser} />

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {recentSearches.map((username) => (
            <button
              key={username}
              onClick={() => fetchUser(username)}
              className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300 transition"
            >
              {username}
            </button>
          ))}
        </div>
      )}

      {loading && <Loading />}
      {!loading && user && <UserCard user={user} />}
      {!loading && repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
}


export default App;