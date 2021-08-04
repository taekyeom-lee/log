import FavoriteItem from "./FavoriteItem";

function FavoriteList({ myFavorites }) {
  return <div>
    {myFavorites.map((myFavorite) => (
        <FavoriteItem key={myFavorite.id} myFavorite={myFavorite} />
      ))}
  </div>
}

export default FavoriteList;
