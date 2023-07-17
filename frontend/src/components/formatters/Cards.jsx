import { Card } from "react-bootstrap";

const Cards = () => {
  return (
    <Card className="column m-1 bg-white">
      <div className="col-12 px-5 py-5 bg-grey skeleton-loading">
        <div className="col-12 px-4 bg-grey skeleton-loading" />
      </div>
      <div className="col-12 p-2 bg-white">
        <div className="column mt-2">
          <div className="col-12 p-2 mt-1 bg-grey skeleton-loading" />
          <div className="col-12 p-2 mt-1 bg-grey skeleton-loading" />
          <div className="col-12 p-2 mt-1 bg-grey skeleton-loading" />
          <div className="col-12 p-1 mt-1 bg-grey skeleton-loading" />
        </div>
      </div>
    </Card>
  );
};

export default Cards;
