import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import courses from '../data/courses.json'; // Adjust the path as needed
import { useTranslation } from 'react-i18next';

const Resources = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const filteredCourses = selectedLanguage === 'All'
    ? courses
    : courses.filter(course => course.language === selectedLanguage);

  // Extract unique languages from courses
  const languages = Array.from(new Set(courses.map(course => course.language)));

  return (
    <div className="bg-[#FEFAE0] text-gray-100 min-h-screen">
       {/* Add the Navbar */}
      <div className="max-w-4xl mx-auto  p-4 pt-28">
        <div className='flex flex-row items-center justify-between '>
        <h1 className="text-3xl font-bold mb-6 text-green-400 transition-transform duration-300 ease-in-out transform hover:scale-105">
          {t('farming_resources')}
        </h1>

        <div className="mb-6">
          {/* <label htmlFor="language" className="block text-gray-600 mb-2">Filter by Language:</label> */}
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="bg-green-50 text-gray-600 border border-gray-600 rounded-md px-4 py-2 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">{t('all_filter')}</option>
            {languages.map((language) => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
