import React from "react";
import Title from "../Components/MultiUse/Title";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 px-10">
      <div className="text-center mb-6 text-2xl">
        <Title title1="Privacy" title2="Policy" />
      </div>

      <p className="text-gray-600 text-sm text-center">Effective Date: <span className="font-semibold">15th Mar 2025</span></p>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">1. Introduction</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">Welcome to TeraFortress. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">2. Information We Collect</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-2">
          <li><strong>Personal Information:</strong> Name, email, phone number, and other relevant details.</li>
          <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and device information.</li>
          <li><strong>Cookies & Tracking:</strong> We use cookies and similar technologies to enhance your browsing experience.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">3. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-2">
          <li>Improve and provide our services.</li>
          <li>Respond to inquiries and support requests.</li>
          <li>Personalize user experience.</li>
          <li>Analyze website performance and security.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">4. Sharing Your Information</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">We do not sell your personal information. However, we may share data with trusted third parties to operate our website, comply with legal obligations, or protect our rights.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">5. Data Security</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">We implement security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">6. Your Rights</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-2">
          <li>Access, update, or delete your personal information.</li>
          <li>Opt out of marketing communications.</li>
          <li>Disable cookies through your browser settings.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">7. Third-Party Links</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">Our website may contain links to third-party sites. We are not responsible for their privacy policies.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">8. Changes to This Privacy Policy</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
      </section>

      <section className="mt-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900">9. Contact Us</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">If you have any questions, please contact us at <span className="font-semibold">[Insert Contact Email]</span>.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
