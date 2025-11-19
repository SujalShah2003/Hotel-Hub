import Banner from '@/components/banner/Banner';
import BookingForm from '@/components/booking/BookingForm';
import ProvidingServices from '@/components/services/ProvidingServices';

const HomePage = () => {
  return (
    <>
      <Banner />
      <ProvidingServices />
      <BookingForm />
    </>
  );
};

export default HomePage;
