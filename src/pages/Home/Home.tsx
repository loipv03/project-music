import BannerSlide from "../../components/BannerSlide/BannerSlide";
import NewRelease from "../../components/NewRelease/NewRelease";

const Home = () => {
  return (
    <>
      <BannerSlide />
      <div style={{ marginBottom: "100px" }}>
        <NewRelease />
      </div>
    </>
  );
};

export default Home;
