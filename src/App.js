// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [authorSearch, setAuthorSearch] = useState('');

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote({
        content: response.data.content,
        author: response.data.author,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const searchByAuthor = async () => {
    try {
      const response = await axios.get(`https://api.quotable.io/quotes?author=${authorSearch}`);
      if (response.data.length > 0) {
        setQuote({
          content: response.data[0].content,
          author: response.data[0].author,
        });
      } else {
        setQuote({
          content: 'No quotes found.',
          author: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/diwali-background.jpg)` }}>
      <div className="container">
        <h1>Quote of the Day</h1>
        <div className="quote-container">
          <blockquote>
            <p>{quote.content}</p>
            <footer>{quote.author}</footer>
          </blockquote>
        </div>
        <button onClick={getQuote}>New Quote</button>
        <label htmlFor="author-search">Search by Author: </label>
        <input
          type="text"
          id="author-search"
          placeholder="Author Name"
          value={authorSearch}
          onChange={(e) => setAuthorSearch(e.target.value)}
        />
        <button onClick={searchByAuthor}>Search</button>
      </div>
    </div>
  );
}

export default App;
