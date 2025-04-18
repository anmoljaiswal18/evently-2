import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const people = [
    {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Sanskar Kesrwani',
        role: 'Co-Founder / CTO',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Random',
        role: 'Co-Founder / CMO',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Unknown',
        role: 'Co-Founder / HR',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
];
export default function Team() {
    return (_jsx("div", { className: "bg-white py-24 sm:py-32", children: _jsxs("div", { className: "mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3", children: [_jsxs("div", { className: "max-w-xl", children: [_jsx("h2", { className: "text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl", children: "Meet our leadership" }), _jsx("p", { className: "mt-6 text-lg/8 text-gray-600", children: "We\u2019re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients." })] }), _jsx("ul", { role: "list", className: "grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2", children: people.map((person) => (_jsx("li", { children: _jsxs("div", { className: "flex items-center gap-x-6", children: [_jsx("img", { alt: "", src: person.imageUrl, className: "size-16 rounded-full" }), _jsxs("div", { children: [_jsx("h3", { className: "text-base/7 font-semibold tracking-tight text-gray-900", children: person.name }), _jsx("p", { className: "text-sm/6 font-semibold text-indigo-600", children: person.role })] })] }) }, person.name))) })] }) }));
}
