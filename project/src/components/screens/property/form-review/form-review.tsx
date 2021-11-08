import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { validateReviewForm } from '../../../../utils/common';
import { MAX_RATING, MessageLength, RatingNames } from '../../../../const';
import { getUploadedCommentStatus, getCommentUploadedErrorStatus } from '../../../../store/data-comments/selectors';
import {
  commentPostAction
} from '../../../../store/api-actions';

function FormReview(): JSX.Element {

  const isUploading = useSelector(getUploadedCommentStatus);
  const isUploadingError = useSelector(getCommentUploadedErrorStatus);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [textReview, setTextReview] = useState('');
  const clearState = (): void => {
    setRating(0);
    setTextReview('');
  };

  const ratingArray: number[] = new Array(MAX_RATING).fill(null).map((value, index) => MAX_RATING - index);
  const { offerId } = useParams<{ offerId: string }>();

  const ratingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(evt.target.value, 10));
  };

  const reviewChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setTextReview(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(commentPostAction(offerId, {rating, comment: textReview}));
    if (!isUploadingError) {
      clearState();
    }
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
                onChange={ratingChangeHandler}
                disabled={isUploading}
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
        onChange={reviewChangeHandler}
        disabled={isUploading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span>
          and describe your stay with
          {textReview.length < MessageLength.Min ? ' at least ': ' up to '}
          <b className="reviews__text-amount">
            {textReview.length < MessageLength.Min ? ' 50 ' : ' 300 '}
            characters
          </b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!validateReviewForm(textReview, rating) || isUploading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormReview;
