import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h2>No Pets Found.</h2>
      ) : (
        pets.map((p) => (
          <Pet
            key={p.id}
            name={p.name}
            animal={p.animal}
            breed={p.breed}
            images={p.images}
            location={`${p.city}, ${p.state}`}
            id={p.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
