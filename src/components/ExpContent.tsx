import type { ExpCard } from "@/constants/types";

type ExpContentProps = {
  expContent: ExpCard;
};

const ExpContent = ({ expContent }: ExpContentProps) => {
  return (
    <div className="card-border rounded-xl p-10">
      <h1 className="text-3xl font-semibold">{expContent.title}</h1>
      <p>{expContent.date}</p>
      <p className="text-white-50">Responsibilities</p>
      <ul className="ms-5 list-disc text-white-50">
        {expContent.responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpContent;
