import matchingImage from "@assets/images/efficient-matching.jpg";
import optimisationImage from "@assets/images/cost-optimization.jpg";
import reductionImage from "@assets/images/congestion-reduction.jpg";
import Image from "next/image";
import Link from "next/link";

export default async function Index() {
  return (
    <div className="grid">
      <section className="bg-hsl-200 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2
            className="mb-4 text-4xl font-semibold"
            style={{
              fontFamily: "Poppins",
            }}
          >
            Carpool Connect
          </h2>
          <p className="mb-8 text-lg">Empowering Commuters Through Innovative Carpooling</p>
          <Link href="/signup" className="rounded-full bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-800">
            Get Started
          </Link>
        </div>
      </section>

      <section className="bg-gray-700 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-3xl font-semibold">Our Solutions</h2>
          <div className="md:grid-cols-3 grid gap-4 p-4">
            <div className="grid">
              <div className="grid rounded-lg bg-white p-6 shadow-lg">
                <Image src={matchingImage} alt="Efficient Commute Matching" className="mx-auto mb-4 h-full object-cover" />
                <h3 className="mb-4 self-end text-xl font-semibold text-gray-900">Efficient Commute Matching</h3>
                <p className="self-end text-gray-700">
                  Our platform utilizes machine learning algorithms to match compatible users for carpooling based on factors like location, destination, and time.
                </p>
              </div>
            </div>
            <div className="grid">
              <div className="grid rounded-lg bg-white p-6 shadow-lg">
                <Image src={optimisationImage} alt="Cost Optimization" className="mx-auto mb-4 h-full object-contain" />
                <h3 className="mb-4 self-end text-xl font-semibold text-gray-900">Cost Optimization</h3>
                <p className="self-end text-gray-700">
                  We integrate fare calculation algorithms that consider factors such as distance, fuel costs, and vehicle occupancy to ensure fair and cost-effective carpooling.
                </p>
              </div>
            </div>
            <div className="grid">
              <div className="grid rounded-lg bg-white p-6 shadow-lg">
                <Image src={reductionImage} alt="Traffic Congestion Reduction" className="mx-auto mb-4 h-full object-contain" />
                <h3 className="mb-4 self-end text-xl font-semibold text-gray-900">Traffic Congestion Reduction</h3>
                <p className="self-end text-gray-700">Our machine learning models predict user demand for carpooling services during peak and off-peak hours, helping alleviate traffic congestion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-hsl-200 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-4xl font-semibold">Safety and Transparency</h2>
          <p className="mb-8 px-12 text-lg [text-wrap:balance]">
            We prioritize safety with features like in-app communication, emergency assistance, and trip tracking. Transparent cost-sharing ensures fair contributions.
          </p>
          <Link href="/signup" className="rounded-full bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-800">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}
