import BannerSlide from "../../components/BannerSlide/BannerSlide";
import Chill from "../../components/Chill/Chill";
import LoveLife from "../../components/LoveLife/LoveLife";
import NewRelease from "../../components/NewRelease/NewRelease";
import RemixAndDance from "../../components/RemixAndDance/RemixAndDance";

const Home = () => {
  return (
    <>
      <BannerSlide />
      <div style={{ marginBottom: "100px" }}>
        <NewRelease />
        <Chill />
        <LoveLife />
        <RemixAndDance />
      </div>
    </>
  );
};

export default Home;
