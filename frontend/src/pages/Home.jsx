import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import ProductOverview from "../components/ProductOverview";
// import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import React, { Suspense, useState } from 'react';
import Payment from "./Payment";
const LazyChatBot = React.lazy(() => import('../components/ChatBot'));
const LazyLanguage = React.lazy(() => import('../components/LanguageButton'));
const onSelectPlan = (plan) => {
  console.log('Plan selected in Payment component:', plan);
  setSelectedPlan(plan);
};
const LoadingComponent = () => {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#FEFAE0]">
        <div className="loading-crop">🌾</div>
        <p className="mt-4 text-green-700 font-semibold text-lg">Loading...</p>
      </div>
    );
  };
function Home(){
    const [chatBotVisible, setChatBotVisible] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const toggleChatBot = () => {
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 500); // Reset rotation after 1s
        setChatBotVisible(!chatBotVisible);
      };

    return (
        <div className="bg-[#FEFAE0] dark:bg-gray-900 transition-colors duration-300">
            <Hero></Hero>
            <Features></Features>
            <Testimonials></Testimonials>
            <ProductOverview></ProductOverview>
            <Payment/>
            <Contact></Contact>

          <button
            onClick={toggleChatBot}
            className={`z-40 fixed bottom-20 md:bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110`}
          >
            <img src="https://cdn-icons-png.flaticon.com/128/6231/6231457.png" alt="chatbot" className="w-6 h-6 inline-block" />
          </button>
          <LazyLanguage />
          {/* ChatBot Component */}
          <Suspense fallback={<LoadingComponent />}>
            <LazyChatBot visible={chatBotVisible} onClose={toggleChatBot} />
          </Suspense>
        </div>
    )
}
export default Home;