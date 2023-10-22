import React from 'react';
import './_ErrorPage.scss';




const ErrorPage = () => {
  return (
    <div className='ErrorPage'>
       <div className='test-community'> 
        <p className='error404'>404</p> 
        <p className='page-not-found'>Page non toruvée</p> 
        <p className='page-not-found-txt'>La page que vous cherchez est introuvable. Nous sommes désolés pour ce désagrément.</p> 

        </div>
    </div>
  );
};

export default ErrorPage;