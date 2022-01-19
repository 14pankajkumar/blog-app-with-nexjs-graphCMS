import Head from "next/head";
import { useRef } from "react";
import { submitImage } from "../services";

const SignUp = () => {
  const nameEl = useRef();
  const bioEl = useRef();
  const storeData = useRef();

  const onSubmit = () => {
    const { value: photo } = storeData.current;

    if (!photo) return;

    const imgObj = { photo };

    submitImage(imgObj).then(res => console.log(res));
  };

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>SignUp</title>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">SignUp</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <textarea
                ref={bioEl}
                name="Bio"
                id=""
                cols="30"
                rows="5"
                placeholder="Bio"
                className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                ref={nameEl}
                placeholder="Name"
                name="Name"
                className="py-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
              />
              <input
                type="text"
                ref={storeData}
                placeholder="Paste link of Image"
                name="Photo"
                className="py-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
              />
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={onSubmit}
                className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
