import React, { useState } from "react";

const MainScreen = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-3xl font-extrabold text-green-600">
            Health Connect
          </h1>
          <nav className="hidden sm:flex space-x-6">
            <a href="/" className="hover:text-green-600 font-medium">
              Home
            </a>
            <a href="#services" className="hover:text-green-600 font-medium">
              Services
            </a>
            <a href="#reviews" className="hover:text-green-600 font-medium">
              Reviews
            </a>
            <a href="#contact" className="hover:text-green-600 font-medium">
              Contact
            </a>
            <a
              href="/login"
              className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-500"
            >
              Logout
            </a>
          </nav>
        </div>
      </header>

      {/* Search Section */}
      {/* <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Find Healthcare Services
          </h2>
          <input
            type="text"
            placeholder="Search for doctors, clinics, or services..."
            className="w-full sm:w-2/3 lg:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </section> */}

      {/* Main Content */}
      <main className="container mx-auto px-6 sm:px-12 py-16">
        {/* Hero Section */}
        <section className="text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-6">
            Welcome to Health Connect
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-12">
            Connect with healthcare professionals and services at your
            convenience.
          </p>
          {/* <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-500 transition duration-300">
            Get Started
          </button> */}
        </section>

        {/* Services Grid */}
        <section
          id="services"
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Book Appointments */}
          <div className="p-8 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
            <img
              src="https://cdn.prod.website-files.com/6435a50900100d46cef36378/64978f8235188665501f2ea3_appointment%20costs.png"
              alt="Book Appointments"
              className="mx-auto mb-6 w-25 h-25 sm:w-36 sm:h-36 rounded-full"
            />
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Book Appointments
            </h3>
            <p className="text-gray-600 mb-6">
              Easily schedule your doctor visits and manage appointments.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500">
              Book Now
            </button>
          </div>

          {/* Nearby Clinics */}
          <div className="p-8 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
            <img
              src="https://img.freepik.com/premium-vector/clinic-hospital-location-icon-simple-editable-vector-graphics_996135-38468.jpg"
              alt="Nearby Clinics"
              className="mx-auto mb-6 w-25 h-25 sm:w-36 sm:h-36 rounded-full"
            />
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Nearby Clinics
            </h3>
            <p className="text-gray-600 mb-6">
              Find clinics and healthcare providers near you.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500">
              Find Clinics
            </button>
          </div>

          {/* Emergency Services */}
          <div className="p-8 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
            <img
              src="https://img.freepik.com/premium-vector/emergency-design_24908-44980.jpg"
              alt="Emergency Services"
              className="mx-auto mb-6 w-25 h-25 sm:w-36 sm:h-36 rounded-full"
            />
            <h3 className="text-2xl font-semibold text-red-600 mb-4">
              Emergency Services
            </h3>
            <p className="text-gray-600 mb-6">
              Get immediate help in case of emergencies.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500">
              Get Help
            </button>
          </div>
        </section>

        {/* Doctor Availability */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Check Doctor Availability
          </h2>
          <div className="flex justify-between items-center mb-4">
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Specialization</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="pediatrician">Pediatrician</option>
              <option value="orthopedic">Orthopedic</option>
            </select>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500">
              Filter
            </button>
          </div>
          {/* Calendar */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Available Slots
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Available Slot */}
              <div className="p-4 bg-white shadow-md rounded-lg">
                <p className="text-lg font-semibold text-gray-700">
                  Dr. John Doe
                </p>
                <p className="text-gray-600">Cardiologist</p>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                  Book Slot
                </button>
              </div>
              {/* Available Slot */}
              <div className="p-4 bg-white shadow-md rounded-lg">
                <p className="text-lg font-semibold text-gray-700">
                  Dr. Jane Smith
                </p>
                <p className="text-gray-600">Dermatologist</p>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                  Book Slot
                </button>
              </div>
              {/* Available Slot */}
              <div className="p-4 bg-white shadow-md rounded-lg">
                <p className="text-lg font-semibold text-gray-700">
                  Dr. Mark Lee
                </p>
                <p className="text-gray-600">Pediatrician</p>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                  Book Slot
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Real-time Consultation */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Real-time Consultation
          </h2>
          <p className="text-gray-600 mb-4">
            Consult your doctor via video call. Available slots are shown below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <p className="text-lg font-semibold text-gray-700">
                Dr. Sarah White
              </p>
              <p className="text-gray-600">Consultation via Video Call</p>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                Start Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Health Connect, All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainScreen;
