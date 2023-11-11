// Quote.js
import React from 'react';

function Quote({ content, author }) {
  return (
    <blockquote>
      <p>{content}</p>
      <footer>{author}</footer>
    </blockquote>
  );
}

export default Quote;
