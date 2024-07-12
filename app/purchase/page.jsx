import Image from "next/image";

export default function Purchase() {
  const merchandise = [
    {
      picture: "/imgs/tshirt.png",
      item: "University T-Shirt",
      price: "250.00",
    },
    {
      picture: "/imgs/lanyards.png",
      item: "Department Lanyards",
      price: "85.00",
    },
    {
      picture: "/imgs/totebag.png",
      item: "University Tote Bag",
      price: "160.00",
    },
    { picture: "/imgs/flask.png", item: "University Tumbler", price: "299.00" },
    {
      picture: "/imgs/tshirt.png",
      item: "University T-Shirt",
      price: "250.00",
    },
    {
      picture: "/imgs/lanyards.png",
      item: "Department Lanyards",
      price: "85.00",
    },
    {
      picture: "/imgs/totebag.png",
      item: "University Tote Bag",
      price: "160.00",
    },
    { picture: "/imgs/flask.png", item: "University Tumbler", price: "299.00" },
  ];

  return (
    <div>
      <section
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 mt-10"
      ></section>
      <section>
        <div>
          <h1 className="text-center text-4xl font-bold mt-12 tracking-wide">
            University Merchandise
          </h1>
        </div>
        <div className="grid grid-cols-4 place-items-center px-20">
          {merchandise.map((merch) => (
            <div className="text-black flex flex-col gap-2 bg-white py-12 rounded-xl">
              <Image
                src={merch.picture}
                height={200}
                width={200}
                alt="Item picture"
              />
              <p>{merch.item}</p>
              <p>Price: P{merch.price}</p>
              <div>
                <button className="bg-primary text-white  px-3 py-2 rounded-full">
                  Order now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button className="border-black border-[1px] text-base rounded-full px-20 py-2">
            See All
          </button>
        </div>
      </section>
      <section className="text-center mt-10">
        <h1 className="text-3xl font-bold">How to Order?</h1>
      </section>
    </div>
  );
}
