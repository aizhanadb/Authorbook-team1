import { AiFillStar } from "react-icons/ai";
const BookItem = ({ book }) => {
  const { title, cover, edition, rating, desc } = book;
  const number = Math.round(rating / 20);
  const starsArray = [...Array(5).keys()];
  return (
    <div className="book-item">
      <img src={cover} alt={title} />
      <div className="book-info">
        <h3>{title}</h3>
        <h3>{edition}</h3>
        <div>
          {starsArray.map((star, index) => {
            const num = index + 1;
            if (num <= number) {
              return (
                <AiFillStar
                  key={index}
                  className="icon star"
                  style={{ cursor: "default" }}
                  size={30}
                />
              );
            } else {
              return (
                <AiFillStar
                  key={index}
                  style={{ cursor: "default" }}
                  size={30}
                  className="icon"
                />
              );
            }
          })}
        </div>
      </div>
      <div className="book-over">
        <h2>Description</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
};
export default BookItem;
