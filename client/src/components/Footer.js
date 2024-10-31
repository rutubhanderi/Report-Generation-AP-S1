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
        <div className="mt-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Akshar Paaul. All rights reserved.</p>
          <p className="mt-2">
            Created by Atharv Raje, Dhairya Mehra, Jay Gondaliya, Kushdeo Shukla and Rutu Bhanderi, SIT Pune
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;