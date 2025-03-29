import React from "react";

const AboutUsSection = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-gray-100 dark:bg-gray-800 transition duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-300">
          About Us
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-200 text-lg">
          Our platform is built for passionate writers and readers who want to share and explore diverse ideas. Whether you're a seasoned blogger or just getting started, we provide the tools and audience to amplify your voice.
        </p>
      </div>
      
      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="p-6 border border-green-300 rounded-lg shadow-md bg-white dark:bg-gray-700">
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">Create & Share</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-200">
            Write your thoughts, publish your ideas, and reach a wide audience eager to hear your voice.
          </p>
        </div>
        <div className="p-6 border border-green-300 rounded-lg shadow-md bg-white dark:bg-gray-700">
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">Engage & Learn</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-200">
            Read insightful blogs, interact with authors, and be part of a growing community of thinkers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
