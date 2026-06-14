export default function Fact({ fact, CATEGORIES}) {
  return (
    <>
      <li key={fact.id} className="fact">
        <p>
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
          <button>👍 {fact.votesInteresting}</button>
          <button>🤯 {fact.votesMindblowing}</button>
          <button>⛔️ {fact.votesFalse}</button>
        </div>
      </li>
    </>
  );
}
