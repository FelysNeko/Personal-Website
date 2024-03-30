import Image from "next/image";

const Card = () => {
  return (
    <div className="card sm:card-side bg-base-100 shadow-xl shadow-elypink/10">
      <figure className="h-40 sm:h-80 sm:w-1/3 relative">
        <Image
          src="/firemoth-light.png"
          alt=""
          style={{ objectFit: "contain" }}
          fill
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            GitHub
            <Image src="/icon/newtab.svg" alt="" width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Project = () => {
  return (
    <div className="min-h-screen mx-4 lg:mx-12">
      <h1 className="text-3xl font-bold mb-4">PROJECT</h1>
      <div className="grid xl:grid-cols-2 gap-6">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Project;
