export default function Feauters() {
    return (
      <div className="content-wrap space-y-12 py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          The simplest way to host all your events
        </h2>
  
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              title: "In-person events",
              desc: "Keep it all together at the venue",
              video:
                "/images/inperson-event.webm",
              link: "",
            },
            {
              title: "Virtual events",
              desc: "Go beyond webinars and workshops",
              video:
                "/images/virtual-event.webm",
              link: "",
            },
            {
              title: "Hybrid events",
              desc: "Merge the physical with the virtual",
              video:
                "/images/hybrid-event.webm",
              link: "",
            },
          ].map((event, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 transition-transform hover:scale-105"
            >
              <div className="relative overflow-hidden rounded-md">
                <video
                  className="w-full rounded-md"
                  playsInline
                  muted
                  loop
                  autoPlay
                >
                  <source src={event.video} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h3 className="text-2xl font-semibold mt-4">{event.title}</h3>
              <p className="text-gray-600 mt-2">{event.desc}</p>
              <a
                href={event.link}
                className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Explore More
              </a>
            </div>
          ))}
        </div>
  
        <div className="constellation-slit mt-12">
          <p className="text-gray-600">
            Featured in the Constellation ShortList™ for Event Marketing &amp;
            Management Software (2020 - 2024)
          </p>
        </div>
      </div>
    );
  }
  