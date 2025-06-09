import { abilities } from "@/constants";

const FeatureCards = () => (
  <div className="padding-x-lg relative z-10 w-full">
    <div className="grid-3-cols mx-auto">
      {abilities.map(({ imgPath, title, desc }) => (
        <div key={title} className="card-border flex flex-col gap-4 rounded-xl p-8">
          <div className="flex size-14 items-center justify-center rounded-full">
            <img src={imgPath} alt={title} />
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
          <p className="text-white-50 text-lg">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
