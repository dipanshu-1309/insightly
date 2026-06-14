import { useEffect, useState } from "react";
import "./App.css";
import CategoryFilters from "./components/CategoryFilters";
import FactList from "./components/FactList";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import supabase from "./supabase";
import Loader from "./components/Loader";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

export default function App() {
  const [formClass, setFormClass] = useState("fact-form hidden");
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      const { data: facts, error } = await supabase.from("facts").select("*");
      if (error) {
        alert(error);
      }

      setFacts(facts);
      setIsLoading(false);
    }
    getFacts();
  }, []);

  return (
    <>
      <Header setFormClass={setFormClass} />
      <NewFactForm
        setFormClass={setFormClass}
        formClass={formClass}
        CATEGORIES={CATEGORIES}
        setFacts={setFacts}
        setFormClass={setFormClass}
      />
      <main className="main">
        <CategoryFilters CATEGORIES={CATEGORIES} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList CATEGORIES={CATEGORIES} facts={facts} />
        )}
      </main>
    </>
  );
}
