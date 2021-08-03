function FavoriteList({myFavorites}) {
  return <div>
    {myFavorites.map((myFavorite) => (
        <div>{myFavorite.url}</div>
      ))}
  </div>
}

export default FavoriteList;
