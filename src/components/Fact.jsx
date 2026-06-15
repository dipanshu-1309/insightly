import supabase from "../supabase";

export default function Fact({ fact, CATEGORIES, setFacts }) {
  async function handleVote(columnName) {
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();

    console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)),
      );
  }

  return (
    <>
      <li key={fact.id} className="fact">
        <p>
          {fact.votesFalse > fact.votesInteresting + fact.votesMindblowing ? (
            <span className="disputed">⛔[DISPUTED]</span>
          ) : null}
          {fact.text}
          <a className="source" href={fact.source} target="_blank">
            (Source)
          </a>
        </p>
        <span
          className="tag"
          style={{
            backgroundColor: CATEGORIES.find(
              (cat) => cat.name === fact.category,
            ).color,
          }}
        >
          {fact.category}
        </span>
        <div className="vote-buttons">
          <button onClick={() => handleVote("votesInteresting")}>
            👍 {fact.votesInteresting}
          </button>
          <button onClick={() => handleVote("votesMindblowing")}>
            🤯 {fact.votesMindblowing}
          </button>
          <button onClick={() => handleVote("votesFalse")}>
            ⛔️ {fact.votesFalse}
          </button>
        </div>
      </li>
    </>
  );
}
