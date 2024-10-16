import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-5">
      <div className="text-center text-white">
        <a href="https://www.aksharpaaul.org/">
          <h1 className="text-lg font-bold mb-5">Akshar Paaul</h1>
        </a>
        <div className="flex justify-around mt-2">
          <a href="https://www.instagram.com/aksharpaaul/" className="hover:underline">
            Instagram
          </a>
          <a href="https://www.linkedin.com/company/akshar-paaul/posts/?feedView=all" className="hover:underline">
            LinkedIn
          </a>
          <a href="https://www.facebook.com/aksharpaaulngo/" className="hover:underline">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
