import Bridegroom from './components/Bridegroom';
import Countdown from './components/Countdown';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import GiftPreview from './components/GiftPreview';
import Header from './components/Header';
import Organization from './components/Organization';
import RSVP from './components/RSVP';
import Seeyou from './components/Seeyou';
import Sidebar from './components/Sidebar';
import Story from './components/Story';
import Where from './components/Where';
import GuestPhotosPage from './pages/GuestPhotosPage';

function App() {
  if (window.location.pathname === '/fotos') {
    return <GuestPhotosPage />;
  }

  return (
    <>
      <Sidebar />
      <div id='oliven-main'>
        <Header />
        <Bridegroom />
        <Countdown />
        <Story />
        <Seeyou />
        <GiftPreview />
        <Organization />
        <Gallery />
        <Where />
        <RSVP />
        <Footer />
      </div>
    </>
  );
}

export default App;
