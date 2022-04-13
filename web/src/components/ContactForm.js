import { useState, useEffect } from "react";

import { useForm } from "../utils/useForm";
import { UseAuthStore } from "../utils/store";

function ContactForm() {
  const csrfToken = UseAuthStore((state) => state.csrfToken);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [classification, setClassification] = useState("New Listing");

  const { handleSubmit, handleChange, formData, errors } = useForm({
    validations: {
      firstName: {
        pattern: {
          value: "^(?!\\s*$).+",
          message: "Input needs to be a string.",
        },
      },
      lastName: {
        pattern: {
          value: "^(?!\\s*$).+",
          message: "Input needs to be a string.",
        },
      },
      companyName: {
        pattern: {
          value: "^(?!\\s*$).+",
          message: "Input needs to be a string.",
        },
      },
      email: {
        pattern: {
          value: "^(?!\\s*$).+",
          message: "Input needs to be a string.",
        },
      },
    },
    onSubmit: () => {
      submitContactRequest();
    },
    initialValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
    },
    errorFlag: () => {
      setIsError(true);
    },
  });

  const submitContactRequest = async () => {
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      company_name: formData.companyName,
      email: formData.email,
      classification: classification,
    };
    formData.firstName = "";
    formData.lastName = "";
    formData.companyName = "";
    formData.email = "";
    try {
      const response = await fetch("/api/data/contact/submit", {
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
    <div className="w-4/5 mx-auto pt-24 pb-16 px-4 grid items-center grid-cols-1 gap-x-8">
      <h1 className="mb-16 text-2xl font-medium leading-6 text-indigo-500">
        Sorry we don't have your company listed... let's fix that!
      </h1>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Contact Us.
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Let's get your company listed. Quick, easy, and absolutely free!
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange("firstName")}
                        className="pl-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange("lastName")}
                        className="pl-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange("companyName")}
                        className="pl-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="text"
                        value={formData.email}
                        onChange={handleChange("email")}
                        className="pl-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        How Can We Help You?
                      </label>
                      <select
                        onChange={(e) => setClassification(e.target.value)}
                        className="pl-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>New Listing</option>
                        <option>Exisiting Listing</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    {isSuccess && (
                      <p className="text-sm text-green-600 animate-pulse	">
                        Contact request sent!
                      </p>
                    )}
                    {isError && (
                      <p className="text-sm text-red-600 animate-pulse	">
                        Error sending contact request.
                      </p>
                    )}
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactForm;
