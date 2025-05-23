import React, { useState } from "react";

type LocationKey = "Chennai" | "KeralaNeelima" | "KeralaCVM";

const LocationsSection: React.FC = () => {
  const [location, setLocation] = useState<LocationKey>("Chennai");

  const mapIframes: Record<LocationKey, string> = {
    Chennai:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.154444741236!2d80.22038028418172!3d13.089396579393412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52642e68adc059%3A0x44809bfe043deede!2sOrange%20Office%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1748014304639!5m2!1sen!2sin',
    KeralaNeelima:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.867382313168!2d76.30683287569774!3d10.027800872554366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d4156faaa25%3A0xe9827e2acc19a094!2sOrange%20Office%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1748014370026!5m2!1sen!2sin',
    KeralaCVM:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8683344590113!2d76.31051408393986!3d10.027722346994494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d5bc4f162f3%3A0x8f0b00fda4f74a01!2sCVM%20Arcade!5e0!3m2!1sen!2sin!4v1748014483347!5m2!1sen!2sin',
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
        {/* Tab Section - 20% */}
        <div className="w-full md:w-[20%] bg-gray-50 p-6 shadow rounded-lg flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Select Location</h3>

          {[
            { key: "Chennai", label: "Chennai" },
            { key: "KeralaNeelima", label: "Kerala Neelima" },
            { key: "KeralaCVM", label: "Kerala CVM Arcade" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setLocation(key as LocationKey)}
              className={`block w-full py-3 px-4 rounded transition font-medium text-white ${
                location === key ? "bg-orange-600" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Map Section - 80% */}
        <div className="w-full md:w-[80%] h-[450px] relative shadow-2xl rounded-lg overflow-hidden">
          <iframe
            src={mapIframes[location]}
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
