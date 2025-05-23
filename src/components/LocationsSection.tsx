import React, { useState } from "react";

const LocationsSection: React.FC = () => {
  const [location, setLocation] = useState<"Chennai" | "Kerala">("Chennai");

  const coordinates = {
    Chennai: "13.08961080590174,80.2251868022076",
    Kerala: "10.02824988200216,76.30940779606874",
  };

  const mapUrl = `https://maps.google.com/maps?q=${coordinates[location]}&z=15&output=embed`;

  return (
    <section className="py-12 bg-white relative">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 text-gray-800">
            Visit Our Locations
          </h2>
          <p className="text-lg text-gray-600">
            Find us at our convenient office locations in Chennai and Kochi
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4">
        {/* Tab Section - 20% */}
        <div className="w-full md:w-[20%] bg-gray-50 p-6 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Select Location</h3>
          <button
            onClick={() => setLocation("Chennai")}
            className={`block w-full mb-4 py-3 px-4 rounded transition font-medium ${
              location === "Chennai"
                ? "bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Chennai
          </button>
          <button
            onClick={() => setLocation("Kerala")}
            className={`block w-full py-3 px-4 rounded transition font-medium ${
              location === "Kerala"
                ? "bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Kerala
          </button>
        </div>

        {/* Map Section - 60% */}
        <div className="w-full md:w-[60%] h-[450px] relative shadow-2xl rounded-lg overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
            className="absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
