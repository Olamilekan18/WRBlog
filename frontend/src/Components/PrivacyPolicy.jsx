import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last updated: April 02, 2025</p>

      <p className="mb-4">
        This Privacy Policy describes Our policies and procedures on the collection, use and
        disclosure of Your information when You use the Service and tells You about Your privacy
        rights and how the law protects You.
      </p>

      <p className="mb-4">
        We use Your Personal data to provide and improve the Service. By using the Service, You
        agree to the collection and use of information in accordance with this Privacy Policy. This
        Privacy Policy has been created with the help of the{" "}
        <a
          href="https://www.termsfeed.com/privacy-policy-generator/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Privacy Policy Generator
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Interpretation and Definitions</h2>

      <h3 className="text-xl font-semibold mt-4 mb-2">Interpretation</h3>
      <p className="mb-4">
        The words of which the initial letter is capitalized have meanings defined under the
        following conditions. The following definitions shall have the same meaning regardless of
        whether they appear in singular or in plural.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Definitions</h3>
      <p className="mb-4">For the purposes of this Privacy Policy:</p>

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Account:</strong> A unique account created for You to access our Service.
        </li>
        <li>
          <strong>Affiliate:</strong> Entity under common control with a party, owning ≥50% of voting
          securities.
        </li>
        <li>
          <strong>Company:</strong> Referred to as "the Company", "We", "Us" or "Our" in this Agreement —
          refers to WRBlog.
        </li>
        <li>
          <strong>Cookies:</strong> Small files placed on Your device, used for browsing and preferences.
        </li>
        <li>
          <strong>Country:</strong> Nigeria.
        </li>
        <li>
          <strong>Device:</strong> Any device that can access the Service, like a computer or smartphone.
        </li>
        <li>
          <strong>Personal Data:</strong> Any information related to an identifiable individual.
        </li>
        <li>
          <strong>Service:</strong> Refers to the Website.
        </li>
        <li>
          <strong>Service Provider:</strong> Any party processing data on behalf of the Company.
        </li>
        <li>
          <strong>Usage Data:</strong> Data collected automatically (e.g. duration of a page visit).
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <a
            href="https://app.vercel.com/WRBlog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            app.vercel.com/WRBlog
          </a>
        </li>
        <li>
          <strong>You:</strong> The user or legal entity accessing or using the Service.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Collecting and Using Your Personal Data
      </h2>

      <h3 className="text-xl font-semibold mt-4 mb-2">Types of Data Collected</h3>

      <h4 className="text-lg font-semibold mt-3">Personal Data</h4>
      <p className="mb-4">
        We may ask You to provide Us with certain personally identifiable information, including:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Email address</li>
        <li>First name and last name</li>
        <li>Usage Data</li>
      </ul>

      <h4 className="text-lg font-semibold mt-3">Usage Data</h4>
      <p className="mb-4">
        Usage Data includes IP address, browser type, pages visited, time spent on pages, and device
        details. It may be collected automatically when using the Service or accessing via mobile.
      </p>

      <h4 className="text-lg font-semibold mt-3">Tracking Technologies and Cookies</h4>
      <p className="mb-4">
        We use Cookies and similar tracking technologies (beacons, tags, scripts) to track activity
        and store information. Examples include:
      </p>

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Browser Cookies:</strong> Stored on Your device; can be disabled via browser settings.
        </li>
        <li>
          <strong>Web Beacons:</strong> Invisible graphics in emails/webpages to measure engagement.
        </li>
      </ul>

      <p className="mb-4">
        For more information about cookies, see the{" "}
        <a
          href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          TermsFeed article
        </a>
        .
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Use of Your Personal Data</h3>

      <p className="mb-4">We use Personal Data for purposes including:</p>

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>To provide and maintain the Service</li>
        <li>To manage Your account</li>
        <li>To fulfill contracts and transactions</li>
        <li>To contact You regarding updates, services, and promotions</li>
        <li>To manage Your requests or feedback</li>
        <li>
          For business transfers, such as mergers, reorganizations, or asset sales involving user
          data
        </li>
        <li>For analytics, trends, marketing improvement, and enhancing user experience</li>
      </ul>

      <p className="mb-4">We may share Your personal data:</p>

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>With Service Providers for analysis and communication</li>
        <li>During business transfers or mergers</li>
        <li>With affiliates (where applicable)</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
