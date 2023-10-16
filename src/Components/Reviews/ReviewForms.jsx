import React from 'react';
import { useUserContext } from '../../Hooks/useUser';
const ReviewForms = () => {
  const { login } = useUserContext();

  return (
    <div className="max-w-4xl mx-auto font-gabarito animate-animeLeft">
      <section>
        <p className="text-slate-200 mt-12 text-4xl ">Reviews</p>
        <ul className="mt-4 flex gap-x-8 p-4 bg-slate-200  rounded-md">
          <li className=" text-slate-200 bg-slate-800 hover:bg-slate-900  p-2 cursor-pointer rounded-md">
            Criar Review
          </li>
          <li className="text-slate-200 bg-slate-800 hover:bg-slate-900 p-2 cursor-pointer rounded-md">
            Buscar Reviews
          </li>
          <li className="text-slate-200 bg-slate-800 hover:bg-slate-900 p-2 cursor-pointer rounded-md"></li>
        </ul>
      </section>
    </div>
  );
};

export default ReviewForms;
