type TitleHeaderProps = {
  title: string;
  sub: string;
};

const TitleHeader = ({ title, sub }: TitleHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="hero-badge">
        <p>{sub}</p>
      </div>
      <div>
        <h1 className="text-center text-3xl font-semibold md:text-5xl">{title}</h1>
      </div>
    </div>
  );
};

export default TitleHeader;
