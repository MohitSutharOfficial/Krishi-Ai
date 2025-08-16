import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FEFAE0] px-4">
            <span className="text-8xl mb-4">😟</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-green-800 mb-3">404</h1>
            <h2 className="text-xl sm:text-2xl text-gray-700 mb-2 text-center">{t('page_not_found')}</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">{t('not_found_message')}</p>
            <a href="/" className="krishiai-btn krishiai-btn-primary">
                🏠 {t('return_home')}
            </a>
        </div>
    );
}

export default NotFound;
