import Cards from "./formatters/Cards";

const Loading = () => {
    return (
        <div className="container-fluid col-12 d-flex flex-wrap justify-content-center">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
    );
};

export default Loading;
