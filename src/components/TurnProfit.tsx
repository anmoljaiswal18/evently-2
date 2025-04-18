export default function TurnProfit() {
    return (
      <div className="flex flex-wrap items-center justify-between bg-white text-black py-12 px-6 lg:px-20">
        {/* Content Section */}
        <div className="max-w-lg">
          <span className="text-black font-semibold uppercase tracking-wide">
            Turn a Profit
          </span>
          <h2 className="text-3xl font-bold mt-2 flex items-center">
            0% commission event ticketing
            <i className="ml-2 text-black">🎟️</i>
          </h2>
          <p className="mt-4 text-black">
            Our ticketing platform supports a wide range of payment options and
            10+ payment gateways, so you can sell tickets exactly the way you
            want. Plus, you’ll never be penalized for your success—there are no
            commissions, and payouts happen instantly.
          </p>
          <div className="mt-4 text-gray-400">
          <span className="font-semibold">REPLACES:</span>{" "}
          <span className="relative text-black">
            <span className="strike-red">Event ticketing platforms</span>
          </span>
        </div>
          <a
            href=""
            className="inline-block mt-6 px-6 py-3 text-lg font-semibold bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
          >
            Explore Our Ticketing Platform
          </a>
        </div>
  
        {/* Image Section */}
        <div className="flex space-x-4 mt-8 lg:mt-0">
          <img
            src="images/ticketing-1.png"
            alt="Event management software with event ticketing solution"
            className="w-40 h-auto lg:w-56 rounded-lg shadow-lg"
          />
          <img
            src="images/ticketing-2.png"
            alt="Payment"
            className="w-48 h-auto lg:w-72 rounded-lg shadow-lg"
          />
        </div>
      </div>
    );
  }
  