function RepoList({ repos }) {
  if (repos.length === 0) {
    return <p className="text-center mt-4 text-gray-500">No public repositories.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
      <ul className="space-y-4">
        {repos.map((repo) => (
          <li key={repo.id} className="bg-white p-4 shadow rounded-lg">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-bold hover:underline"
            >
              {repo.name}
            </a>
            <p className="text-gray-700">{repo.description || "No description"}</p>
            <div className="flex gap-6 mt-2 text-sm text-gray-600">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;
