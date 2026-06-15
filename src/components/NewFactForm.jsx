import { useState } from "react";
import supabase from "../supabase";

export default function NewFactForm({
  formClass,
  CATEGORIES,
  setFacts,
  setFormClass,
}) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsuploading] = useState(false);
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

  async function handSubmit(e) {
    // 1.prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    //2.check if data is valid, if so create a new fact
    if (text && isValidHttpUrl(source) && category) {
      //3.upload facts to supabase and receive new facts
      setIsuploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsuploading(false);
      console.log(newFact);

      //4. add new fact to the UI
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
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
          disabled={isUploading}
        />
        <span>{500 - textLength}</span>

        <input
          type="text"
          placeholder="Trustworthy source..."
          value={source}
          onChange={(e) => setSource(e.target.value)}
          disabled={isUploading}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Choose category:</option>
          {CATEGORIES.map((cat) => (
            <option value={cat.name} key={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          ))}
        </select>
        <button className="btn btn-large" disabled={isUploading}>
          Post
        </button>
      </form>
    </>
  );
}
