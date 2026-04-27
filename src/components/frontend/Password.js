 import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail } from 'lucide-react';

const Password = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center px-4 page-fade-in">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <Link to="/login" className="flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition">
          <ChevronLeft size={16} /> Назад ко входу
        </Link>

        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-blue-600" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Забыли пароль?</h1>
              <p className="text-gray-500 mt-2 text-sm">Введите ваш Email, и мы отправим вам инструкцию по восстановлению.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border focus:border-blue-500 focus:outline-none" 
                  placeholder="Введите ваш email" 
                />
              </div>
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Отправить ссылку
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-green-600" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Проверьте почту</h1>
            <p className="text-gray-500 mt-2 text-sm">Мы отправили ссылку для сброса пароля на ваш адрес.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-6 text-blue-600 font-semibold hover:underline"
            >
              Я не получил письмо, отправить снова
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Password;