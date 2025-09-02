'use client'
import Reviews from "./reviews";
import Mq from "./mq";
import CountUp from "react-countup";
import ReviewModal from "./ReviewModal";
import { apab, reviews } from "../shared/data";
import { review } from "../shared/types";
import { useState } from "react";
export default function Ct(){
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
        <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        What Our Users Say
                    </h2>
                    {/* <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Real feedback from millions of users worldwide who trust our products every day
                    </p> */}
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                    </div>
                </div>

                {/* Stats Section */}
                

                {/* Testimonials Section */}
                {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8"> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Mock testimonials - replace with actual review data */}
                        {reviews.map((review, index) => {
                            return (<div
                                key={index}
                                onClick={() => openReviewModal(review)}
                                className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105 min-h-[280px] flex flex-col justify-between"
                            >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {review.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{review.username}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{apab.get(review.appname)!}</p>
                                </div>
                            </div>
                            <div className="flex-1 mb-4">
                                <p className="text-gray-700 dark:text-gray-300 italic line-clamp-4">
                                    {review.review}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">Click to read more</span>
                            </div>
                        </div>);
                        })}
                        
                    </div>

                    {/* Additional Reviews */}
                    {/* <div className="mt-8 border-t border-gray-200 dark:border-gray-600 pt-8"> */}
                        {/* {showlistorscroll(1)} */}
                    {/* </div> */}
                {/* </div> */}

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <a
                        href="https://www.amazon.com/gp/mas/dl/android"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Read More Reviews
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Review Modal */}
            {selectedReview && (
                <ReviewModal
                    open={isModalOpen}
                    onClose={closeReviewModal}
                    reviewData={selectedReview}
                />
            )}
        </section>
    );
}

export function showlistorscroll(whichone: number){
    if(whichone === 1) return (
        <div className="flex flex-row overflow-x-auto space-x-6 pb-4">
            {Mq(1)}
        </div>
    );

    return <Reviews />;
}