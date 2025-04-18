import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Feauters() {
    return (_jsxs("div", { className: "content-wrap space-y-12 py-16 px-6 bg-gray-50 text-center", children: [_jsx("h2", { className: "text-4xl font-bold text-gray-800", children: "The simplest way to host all your events" }), _jsx("div", { className: "flex flex-wrap justify-center gap-8", children: [
                    {
                        title: "In-person events",
                        desc: "Keep it all together at the venue",
                        video: "/images/inperson-event.webm",
                        link: "",
                    },
                    {
                        title: "Virtual events",
                        desc: "Go beyond webinars and workshops",
                        video: "/images/virtual-event.webm",
                        link: "",
                    },
                    {
                        title: "Hybrid events",
                        desc: "Merge the physical with the virtual",
                        video: "/images/hybrid-event.webm",
                        link: "",
                    },
                ].map((event, index) => (_jsxs("div", { className: "relative bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 transition-transform hover:scale-105", children: [_jsx("div", { className: "relative overflow-hidden rounded-md", children: _jsxs("video", { className: "w-full rounded-md", playsInline: true, muted: true, loop: true, autoPlay: true, children: [_jsx("source", { src: event.video, type: "video/webm" }), "Your browser does not support the video tag."] }) }), _jsx("h3", { className: "text-2xl font-semibold mt-4", children: event.title }), _jsx("p", { className: "text-gray-600 mt-2", children: event.desc }), _jsx("a", { href: event.link, className: "inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700", children: "Explore More" })] }, index))) }), _jsx("div", { className: "constellation-slit mt-12", children: _jsx("p", { className: "text-gray-600", children: "Featured in the Constellation ShortList\u2122 for Event Marketing & Management Software (2020 - 2024)" }) })] }));
}
