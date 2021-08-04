import classes from './FavoriteItem.module.css'

function FavoriteItem({ myFavorite }) {
  return (
    <div className={classes.item}>      
      <div className={classes.subject}>{myFavorite.subject}</div>
      <a href={myFavorite.url}>{myFavorite.title}</a>
    </div>
  );
}

export default FavoriteItem;
