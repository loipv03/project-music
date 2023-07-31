import BannerSlide from "../../components/BannerSlide/BannerSlide";
import NewRelease from "../../components/NewRelease/NewRelease";

const Home = () => {
  return (
    <main className="main">
      <BannerSlide />
      <div className="content">
        <NewRelease />
      </div>
    </main>
  );
};

export default Home;
