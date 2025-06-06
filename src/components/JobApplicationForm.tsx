import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Apply for Senior React Developer</h1>
        <iframe
          data-tally-src="https://tally.so/embed/mOeXGa?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="691"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Application Form"
        ></iframe>
      </div>
    </div>
  );
};

export default App;
