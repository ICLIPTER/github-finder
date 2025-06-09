function UserCard({ user }) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name || user.login}</h2>
          <p className="text-gray-600">@{user.login}</p>
          <p className="mt-2 text-sm text-gray-800">{user.bio}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between text-center">
        <div>
          <p className="text-lg font-bold">{user.followers}</p>
          <p className="text-sm text-gray-600">Followers</p>
        </div>
        <div>
          <p className="text-lg font-bold">{user.following}</p>
          <p className="text-sm text-gray-600">Following</p>
        </div>
        <div>
          <p className="text-lg font-bold">{user.public_repos}</p>
          <p className="text-sm text-gray-600">Repos</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
