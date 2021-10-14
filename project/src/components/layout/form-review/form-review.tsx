import { useState, ChangeEvent } from 'react';
import { MAX_RATING, RatingNames } from '../../../const';

type StarsScaleProps = {
  rate: number;
}

function FormReview(): JSX.Element {

  const [review, setReview] = useState({
    rating: 0,
    text: '',
  });

  const {text} = review;
  const ratingArray: number[] = new Array(MAX_RATING).fill(null).map((value, index) => index);

  function StarsScale({rate}: StarsScaleProps): JSX.Element {

    const ratingChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setReview({
        ...review,
        rating: parseInt(e.target.value, 10),
      });
    };

    return (
      <>
        <input className="form__rating-input visually-hidden"
          name="rating"
          value={rate}
          id={rate === 1 ? `${rate}-star` : `${rate}-stars`}
          type="radio"
          onChange={(e) => ratingChangeHandler(e)}
        />
        <label
          htmlFor={rate === 1 ? `${rate}-star` : `${rate}-stars`}
          className="reviews__rating-label form__rating-label"
          title={RatingNames[rate]}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </>
    );
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          ratingArray.map((value, index) =>
            (
              <StarsScale rate={ratingArray.length - index} key={value} />
            ),
          )
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={text}
        onChange={({ target } : ChangeEvent<HTMLTextAreaElement>) => {
          setReview({
            ...review,
            text: target.value,
          });
        }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default FormReview;
