import React from 'react';
import { allReviewsbyFilmId_GET } from '../Api/Api';
import noAvatar from '../../Assets/noAvatar.svg';
import { FrownFilled } from '@ant-design/icons';
import ReadMore from '../Helper/ReadMore';
import PaginationReview from './PaginationReview';
import CustomLoading from '../Helper/CustomLoading';

const ReviewFeedByFilm = ({ tokenUser, FilmId }) => {
  const [reviews, setReviews] = React.useState([]);
  const [data, setData] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const limitItemPerPage = 6;

  // Setar pagina atual -> nova
  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  React.useEffect(() => {
    setLoading(true);
    const startIndex = (currentPage - 1) * limitItemPerPage;
    let rulePagination = `pagination[start]=${startIndex}&pagination[limit]=${limitItemPerPage}`;
    allReviewsbyFilmId_GET(tokenUser, rulePagination, FilmId)
      .then((data) => {
        setReviews(data);
        setData(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ocorreu um erro para mostrar as reviews:', error);
      });
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <CustomLoading />
        </div>
      ) : (
        <div className="max-w-7xl lg:max-w-5xl mx-auto animate-fadeIn">
          <div>
            {reviews.data && reviews.data.length !== 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-8 gap-x-8 justify-items-center">
                {reviews?.data?.map(
                  (review) =>
                    review.attributes.user?.data && (
                      <div
                        className="border-b border-opacity-30 border-b-blue-950 p-5 grid grid-cols-[auto,1fr] grid-rows-[auto] w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_1px]"
                        key={review.id}
                      >
                        <div className="mr-4 ">
                          {review.attributes.user.data?.id &&
                          review.attributes.user.data.attributes.avatar.data !==
                            null ? (
                            <img
                              className="w-[60px] h-[60px] rounded-full box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;"
                              src={
                                review.attributes.user.data?.attributes?.avatar
                                  ?.data.attributes.url
                              }
                              alt="Avatar do autor"
                            />
                          ) : (
                            <img
                              className="w-[60px]  h-[60px] rounded-full box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;"
                              src={noAvatar}
                              alt="Avatar do autor"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-slate-400 mb-2">
                            {`por `}
                            <span className="font-bold text-slate-300">
                              {review.attributes.user.data &&
                                review.attributes.user.data.attributes.username}
                            </span>
                          </p>
                          <p
                            className={`text-slate-200 font-serif text-ellipsis overflow-hidden`}
                          >
                            <ReadMore
                              key={review.id}
                              reviewId={review.id}
                              textAlert={'Esta review pode conter spoilers.'}
                              textUnderline={' Eu posso lidar com a verdade.'}
                              text={review.attributes.reviewContent}
                              hasSpoiler={review.attributes.hasSpoiler}
                              maxLength={300}
                            />
                          </p>
                        </div>
                      </div>
                    ),
                )}{' '}
                <div className="col-span-full">
                  {reviews.length !== 0 && (
                    <PaginationReview
                      totalItems={reviews.meta.pagination.total}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      limitItemPage={6}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-24 animate-fadeIn">
                <p className="text-slate-200 text-lg mx-auto sm:text-center">
                  Até o momento, não criaram nenhuma review para este filme.{' '}
                  <FrownFilled />
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewFeedByFilm;
