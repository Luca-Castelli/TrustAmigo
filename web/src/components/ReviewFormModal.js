import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/outline";
import { Rating } from "@mui/material";
import { useForm } from "../utils/useForm";
import { UseAuthStore } from "../utils/store";

function ReviewFormModal({ items }) {
  const open = items.showReviewFormModal;
  const setOpen = items.setShowReviewFormModal;
  const companyName = items.companyName;

  const cancelButtonRef = useRef(null);
  const [rating, setRating] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const csrfToken = UseAuthStore((state) => state.csrfToken);

  const { handleSubmit, handleChange, formData, errors } = useForm({
    validations: {
      reviewerName: {
        pattern: {
          value: "^(?!\\s*$).+",
          message: "Input needs to be a string.",
        },
      },
      reviewerCompany: {
        pattern: {
          value: "^(?!\\s*$).+",
          message: "Input needs to be a string.",
        },
      },
      reviewerRole: {
        pattern: {
          value: "^(?!\\s*$).+",
          message: "Input needs to be a string.",
        },
      },
      comment: {
        pattern: {
          value: "^(?!\\s*$).+",
          message: "Input needs to be a string.",
        },
      },
    },
    onSubmit: () => {
      submitReview();
    },
    initialValues: {
      reviewerName: "",
      reviewerCompany: "",
      reviewerRole: "",
      comment: "",
    },
    errorFlag: () => {
      setIsError(true);
    },
  });

  const submitReview = async () => {
    const payload = {
      reviewed_company: companyName,
      reviewer_name: formData.reviewerName,
      reviewer_company: formData.reviewerCompany,
      reviewer_title: formData.reviewerRole,
      rating: rating,
      description: formData.comment,
    };
    try {
      const response = await fetch("/api/data/review/submit", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.status !== 200) {
        setIsError(true);
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
      setIsSuccess(false);
    }, 10000);
  }, [isSuccess, isError]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <HeartIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Submit a review for {companyName}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Help people make the right software decisions! Your view
                        will be public once it's been verified.
                      </p>
                      <form className="grid grid-rows-5 grid-cols-1 gap-2 text-sm text-gray-500 p-2">
                        <label>What's your name?</label>
                        <input
                          type="text"
                          value={formData.reviewerName}
                          onChange={handleChange("reviewerName")}
                          className="pl-2 rounded border"
                          required
                        />
                        <label>What company do you work for?</label>
                        <input
                          type="text"
                          value={formData.reviewerCompany}
                          onChange={handleChange("reviewerCompany")}
                          className="pl-2 rounded border"
                          required
                        />
                        <label>What's your role?</label>
                        <input
                          type="text"
                          value={formData.reviewerRole}
                          onChange={handleChange("reviewerRole")}
                          className="pl-2 rounded border"
                          required
                        />
                        <label>Rating?</label>
                        <Rating
                          name="simple-controlled"
                          value={rating}
                          onChange={(event, newValue) => {
                            setRating(newValue);
                          }}
                        />
                        <label>Comment?</label>
                        <textarea
                          value={formData.comment}
                          onChange={handleChange("comment")}
                          className="pl-2 rounded border"
                          required
                        />
                      </form>
                    </div>
                    {isSuccess && (
                      <p className="text-sm text-green-600 animate-pulse	">
                        Successfully submitted review.
                      </p>
                    )}
                    {isError && (
                      <p className="text-sm text-red-600 animate-pulse	">
                        Failed to submitted review.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ReviewFormModal;
