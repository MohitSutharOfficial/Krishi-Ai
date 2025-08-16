import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Pricing from "../components/Pricing";
import Checkout from "../components/Checkout";
import PaymentSuccess from "../components/PaymentSuccess";
export default function Payment() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const pricingPlans = [
    {
      title: t('pricingPlans.basicPlan.title'),
      price: t('pricingPlans.basicPlan.price'),
      pricepermonth: 1500,
      features: t('pricingPlans.basicPlan.features', { returnObjects: true }),
      buttonText: t('pricingPlans.buttonText.getStarted'),
      buttonColor: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: t('pricingPlans.proPlan.title'),
      price: t('pricingPlans.proPlan.price'),
      pricepermonth: 3000,
      features: t('pricingPlans.proPlan.features', { returnObjects: true }),
      buttonText: t('pricingPlans.buttonText.upgradeNow'),
      buttonColor: 'bg-lime-600 hover:bg-lime-700',
      popular: true,
    },
    {
      title: t('pricingPlans.enterprisePlan.title'),
      price: t('pricingPlans.enterprisePlan.price'),
      pricepermonth: 5000,
      features: t('pricingPlans.enterprisePlan.features', { returnObjects: true }),
      buttonText: t('pricingPlans.buttonText.contactUs'),
      buttonColor: 'bg-gray-800 hover:bg-gray-900',
    },
  ];

  // Check if a plan was passed via navigation state
  React.useEffect(() => {
    if (location.state?.selectedPlan) {
      console.log('Plan received via navigation:', location.state.selectedPlan);
      setSelectedPlan(location.state.selectedPlan);
    }
  }, [location.state]);

  const onSelectPlan = (plan) => {
    console.log('Plan selected in Payment component:', plan);
    setSelectedPlan(plan);
  };

  const handleBackToPlans = () => {
    setSelectedPlan(null);
  };

  const handlePaymentSuccess = (paymentData) => {
    setPaymentCompleted(true);
    setPaymentData(paymentData);
  };

  // If payment is completed, show success page
  if (paymentCompleted && paymentData) {
    return <PaymentSuccess />;
  }
  return (
    <section className="pricing py-12 px-6 md:py-24 md:px-12 bg-gradient-to-b from-[#FEFAE0] to-white text-gray-800 min-h-screen flex items-center justify-center">
      {selectedPlan ? (
        <Checkout
          plan={selectedPlan}
          onBack={handleBackToPlans}
          onPaymentSuccess={handlePaymentSuccess} // Add this prop
        />
      ) : (
        <div className="w-full">
          <Pricing onSelectPlan={onSelectPlan} pricingPlans={pricingPlans} />
        </div>
      )}
    </section>
  );
}