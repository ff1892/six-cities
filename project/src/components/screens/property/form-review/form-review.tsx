import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import { MAX_RATING, RatingNames } from '../../../../const';
import { ThunkAppDispatch } from '../../../../types/action';
import { CommentPost } from '../../../../types/comment';
import {
  commentPostAction,
  fetchCurrentOfferCommentsAction
} from '../../../../store/api-actions';

const REVIEW_MIN_LENGTH = 50;

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCommentFormSubmit(id: string, commentPost: CommentPost) {
    dispatch(commentPostAction(id, commentPost));
    dispatch(fetchCurrentOfferCommentsAction(id));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function FormReview({ onCommentFormSubmit }: PropsFromRedux): JSX.Element {

  const [rating, setRating] = useState(0);
  const [textReview, setTextReview] = useState('');

  const ratingArray: number[] = new Array(MAX_RATING).fill(null).map((value, index) => MAX_RATING - index);
  const { offerId } = useParams<{ offerId: string }>();

  const ratingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setRating(parseInt(evt.target.value, 10));
  };

  const reviewChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setTextReview(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onCommentFormSubmit(
      offerId,
      {
        rating: rating,
        comment: textReview,
      });
    setRating(0);
    setTextReview('');
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          ratingArray.map((value) => (
            <Fragment key={value}>
              <input className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={value === 1 ? `${value}-star` : `${value}-stars`}
                type="radio"
                checked={value === rating}
                onChange={(evt) => ratingChangeHandler(evt)}
              />
              <label
                htmlFor={value === 1 ? `${value}-star` : `${value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={RatingNames[value]}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={textReview}
        onChange={(evt) => reviewChangeHandler(evt)}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span>
          and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={textReview.length < REVIEW_MIN_LENGTH || !rating}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export {FormReview};
export default connector(FormReview);
