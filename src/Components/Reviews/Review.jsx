import React from 'react';
import ReviewForms from './ReviewForms';
import { Route, Routes } from 'react-router-dom';
import ReviewUser from './ReviewUser';
import NotFound404 from '../Helper/NotFound404';

const Review = () => {
  return (
    <div>
      <Routes>
        <Route path="/create" element={<ReviewForms />} />
        <Route path="/:id" element={<ReviewUser />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default Review;
