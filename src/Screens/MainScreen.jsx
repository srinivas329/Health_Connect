import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { topDoctors } from "../data";
import Chatbot from "../Components/Chatbot";

const MainScreen = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const token = localStorage.getItem("accessToken");
  const [profile, setProfile] = useState(null);
  const [healthConnect, setHealthConnect] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to track chatbox visibility

  const navigate = useNavigate();

  const onHandleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const getprofile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  };

  const getHealthConnect = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch health connect details");
      }
    } catch (error) {
      console.error("Error fetching health connect details:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const data = await getprofile();
          console.log("profile data:- ", data.message);
          setProfile(data.message); // Update the profile state
        } catch (error) {
          console.error("Error fetching profile:", error);
          onHandleLogout();
        }
      };

      fetchProfile();

      const fetchHealthConnectDetails = async () => {
        try {
          const data = await getHealthConnect();
          setHealthConnect(data);
        } catch (error) {
          console.error("Error fetching health connect details:", error);
        }
      };

      fetchHealthConnectDetails();
    }
  }, [token]);

  // Carousel settings for smooth continuous scrolling
  const settings = {
    dots: false, // Hide dots for a cleaner look
    infinite: true, // Enable infinite loop
    speed: 3000, // Transition speed in milliseconds
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 0, // Set to 0 for continuous scrolling
    cssEase: "linear", // Use linear easing for smooth scrolling
    pauseOnHover: false, // Disable pause on hover for continuous movement
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 text-gray-800 ${
        isChatOpen ? "mr-96" : ""
      }`}
    >
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-3xl font-extrabold text-green-600">
            Health Connect
          </h1>
          <nav className="hidden sm:flex space-x-6">
            <a href="/" className="hover:text-green-600 font-medium">
              Home
            </a>
            <button
              onClick={onHandleLogout}
              className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-500"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 sm:px-12 py-16 mt-20">
        {/* Hero Section */}
        <section className=" items-center flex justify-between ">
          <div className="">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-6">
              Welcome, {profile}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-12">
              Manage your healthcare needs with ease.
            </p>
          </div>
          {/* Chat Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-500"
          >
            {isChatOpen ? "Close Chat" : "Chat with Us"}
          </button>
        </section>

        {/* Top Doctors Carousel */}
        <div className="mb-12 overflow-hidden">
          <h3 className=" sm:text-xl text-3xl font-extrabold text-green-600 ml-auto text-center">
            Top Doctors in India
          </h3>
          <Slider {...settings}>
            {topDoctors.map((doctor) => (
              <div key={doctor.id} className="px-2">
                <div className=" bg-opacity-75 p-6 rounded-lg  text-center">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-32 h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold text-green-700">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Services Grid */}
        <section className="mt-16">
          <h3 className="text-3xl font-extrabold text-green-600 text-center mb-8">
            Our Services
          </h3>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {healthConnect &&
              healthConnect.map((card) => (
                <div
                  key={card.id}
                  className="p-8 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300"
                >
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="mx-auto mb-6 w-25 h-25 sm:w-36 sm:h-36 rounded-full"
                  />
                  <h3 className="text-2xl font-semibold text-green-700 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{card.description}</p>
                  <button
                    className={`${
                      card.buttonColor
                    } text-white px-4 py-2 rounded-full hover:${card.buttonColor.replace(
                      "600",
                      "500"
                    )}`}
                  >
                    {card.buttonText}
                  </button>
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Health Connect, All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default MainScreen;
