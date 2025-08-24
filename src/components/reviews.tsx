import { apab, reviews } from "../shared/data";
import LineClamp from "./LineClamp";
import StoreIcons from "./storeicons";
import ReviewModal from "./ReviewModal";
import { review } from "../shared/types";
import { useState } from "react";

export default function Reviews(){
    const [selectedReview, setSelectedReview] = useState<review | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openReviewModal = (review: review) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    return (
        <>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {reviews.map((review, index) => {

      return (
    <div
    key={index}
    onClick={() => openReviewModal(review)}
    className="sm:flex shadow-indigo-500/50 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-2xl col-span-1 mx-5 xl:mx-4 mb-8 p-4 w-302 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105 min-h-[280px] flex flex-col justify-between">
      {/* <div className="w-120 p-4">
          <img
          src={image}
          className="w-120 "/>
      </div> */}
      <div className="text-center w-full flex-1 flex flex-col justify-center">
      <h3 className="font-bold text-center m-4">{apab.get(review.appname)!}</h3>
      <noscript>

             <div className="text-center">{review.review}</div>
            </noscript>
      <LineClamp className="text-center mb-4" lines={3} text={review.review}/>
      {/* <h5 className="font-bold text-center m-4">{storename}</h5> */}

      {/* <img src={image} className="w-32"/> */}
      <div className="flex justify-center mb-4">
        <StoreIcons{...{storename:review.storename,w:0}}/>
      </div>
      <div className="text-center">
        <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">Click to read more</span>
      </div>
      </div>
    </div>
      );
  })}
        </div>

        {/* Review Modal */}
        {selectedReview && (
            <ReviewModal
                open={isModalOpen}
                onClose={closeReviewModal}
                reviewData={selectedReview}
            />
        )}
        </>
    );
}