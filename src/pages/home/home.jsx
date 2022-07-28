import React from "react";
import Gallery from "../../components/gallery/gallery";
import HomeNavbar from "../../components/navbar/home-navbar";
import NewsBar from "../../components/news/newsbar";
import PhotoCarousel from "../../components/photo-carousel/photo-carousel";

const Home = () => {
  return (
    <>
      <HomeNavbar />
      <h1>Home</h1>
      <PhotoCarousel />
      <NewsBar />
      <Gallery />
    </>
  );
};

export default Home;
