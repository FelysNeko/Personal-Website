import Card from "./Card";

interface Props {
  mode: string;
  id: string;
  data: {
    title: string;
    tech: string[];
    pic: string;
    text: string;
    link: string;
  }[];
}

const CardContainer = ({ mode, id, data }: Props) => {
  return (
    <section className={`${mode}-mode`} id={id}>
      <div className="container-lg">
        <h1>projects</h1>
        <div className="row">
          {data.map((each) => (
            <div
              key={each.title}
              className="col-lg-4 d-flex justify-content-center"
            >
              <Card mode={mode} data={each} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardContainer;
