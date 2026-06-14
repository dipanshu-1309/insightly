import Fact from "./Fact";

export default function FactList({ CATEGORIES, facts }) {
  //temporary

  return (
    <>
      <section>
        <ul className="facts-list">
          {facts.map((fact) => (
            <Fact key={fact.id} fact={fact} CATEGORIES={CATEGORIES} />
          ))}
        </ul>
        <p>There are {facts.length} facts. Add your own!</p>
      </section>
    </>
  );
}
