import Fact from "./Fact";

export default function FactList({ CATEGORIES, facts, setFacts }) {
  //temporary

  return (
    <>
      <section>
        <ul className="facts-list">
          {facts.map((fact) => (
            <Fact
              key={fact.id}
              fact={fact}
              CATEGORIES={CATEGORIES}
              setFacts={setFacts}
            />
          ))}
        </ul>
        {facts.length == 0 ? (
          <NoFactsList />
        ) : (
          <p>There are {facts.length} facts. Add your own!</p>
        )}
      </section>
    </>
  );
}

function NoFactsList() {
  return <p className="message">{"No Facts in this section :("}</p>;
}
