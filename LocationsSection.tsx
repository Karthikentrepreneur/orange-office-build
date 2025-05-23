import React, { useState } from "react";

const LocationsSection: React.FC = () => {
  const [mapUrl, setMapUrl] = useState<string>(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1544442225477!2d80.22267627572437!3d13.089396612283391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52642e68adc059%3A0x44809bfe043deede!2sOrange%20Office%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1746282320085!5m2!1sen!2sin"
  );

  const handleLocationChange = (location: "Chennai" | "Kerala") => {
    const urls: Record<"Chennai" | "Kerala", string> = {
      Chennai:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1544442225477!2d80.22267627572437!3d13.089396612283391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52642e68adc059%3A0x44809bfe043deede!2sOrange%20Office%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1746282320085!5m2!1sen!2sin",
      Kerala:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0319938352884!2d76.30001907485873!3d9.981635090131038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0873775b921b81%3A0x10a2a4aa872adf6c!2sInfopark%20Kochi!5e0!3m2!1sen!2sin!4v1716452162044!5m2!1sen!2sin",
    };

    setMapUrl(urls[location]);
  };

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
        {/* Sidebar - 60% */}
        <div className="w-full md:w-[60%] bg-gray-50 p-6 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Select Location</h3>
          <button
            onClick={() => handleLocationChange("Chennai")}
            className="block w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition"
          >
            Chennai
          </button>
          <button
            onClick={() => handleLocationChange("Kerala")}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition"
          >
            Kerala
          </button>
        </div>

        {/* Map Section - 40% */}
        <div className="w-full md:w-[40%] h-[450px] relative shadow-2xl rounded-lg overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
            className="absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
