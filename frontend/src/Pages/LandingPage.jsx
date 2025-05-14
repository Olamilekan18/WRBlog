import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import AboutUsSection from "../Components/AboutUsSection";
import FeatureSection from "../Components/FeatureSection";
import FeaturedPostsSection from "../Components/FeaturedPosts";
import TestimonialsSection from "../Components/Testimonials";
import Newsletter from "../Components/NewsLetter.jsx";
import { useRef, useEffect } from "react";
export default function LandingPage() {
    const aboutRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
  console.log('About ref:', aboutRef.current);
  console.log('Contact ref:', contactRef.current);
}, []);


const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  console.log("About ref:", aboutRef.current);
    console.log("Contact ref:", contactRef.current);

    return (
        <div>
            <Navbar
                scrollToAbout = {scrollToAbout}
                scrollToContact = {scrollToContact}
            />
            <HeroSection />
            <div ref={aboutRef}>
                <AboutUsSection />
            </div>
            <FeatureSection />
            <FeaturedPostsSection />
            <TestimonialsSection />
            <div ref={contactRef}>
                <Newsletter />
            </div>
        </div>
    );
}