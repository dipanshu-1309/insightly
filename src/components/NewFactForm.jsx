import { useState } from "react";

export default function NewFactForm({
  formClass,
  CATEGORIES,
  setFacts,
  setFormClass,
}) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  function handSubmit(e) {
    // 1.prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    //2.check if data is valid, if so create a new fact
    if (text && isValidHttpUrl(source) && category) {
      //3. create a new fact object
      const newFact = {
        id: Math.round(Math.random() * 1000000),
        text: text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };
      //4. add new fact to the UI
      setFacts((facts) => [newFact, ...facts]);
      //5.reset the input field
      setText("");
      setSource("");
      setCategory("");
      //6. close the form
      setFormClass("fact-form hidden");
    }
  }

  return (
    <>
      <form className={formClass} onSubmit={handSubmit}>
        <input
          type="text"
          placeholder="Share a fact with the world..."
          value={text}
          maxLength={500}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <span>{500 - textLength}</span>

        <input
          type="text"
          placeholder="Trustworthy source..."
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Choose category:</option>
          {CATEGORIES.map((cat) => (
            <option value={cat.name} key={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          ))}
        </select>
        <button className="btn btn-large">Post</button>
      </form>
    </>
  );
}
