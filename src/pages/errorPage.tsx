import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: number;
  className?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message, code, title, className }: ErrorPageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <main className={`grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 ${className}`}>
      <div className="text-center">
        {code && <p className="text-base font-semibold text-indigo-600">{code}</p>}
        {title && <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{title}</h1>}
        {message && <p className="mt-6 text-base leading-7 text-dark-gray-light">{message}</p>}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => navigate('/')}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t('errorPage.goBackHome')}
          </button>
          {/* <button onClick={() => navigate('/contact')} className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </button> */}
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
