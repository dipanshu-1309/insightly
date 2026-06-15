import { useEffect, useState } from "react";
import "./App.css";
import CategoryFilters from "./components/CategoryFilters";
import FactList from "./components/FactList";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import supabase from "./supabase";
import Loader from "./components/Loader";

const CATEGORIES = [
  { name: "tech", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "development", color: "#ef4444" },
  { name: "culture", color: "#eab308" },
  { name: "dance", color: "#db2777" },
  { name: "fitness", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "trending", color: "#8b5cf6" },
];

export default function App() {
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);

      let query = supabase.from("facts").select("*");

      if (currentCategory !== "all")
        query = query.eq("category", currentCategory);

      const { data: facts, error } = await query
        .order("created_at", { ascending: false })
        .limit(1000);

      if (error) {
        alert(`There was an error loading data. Error: ${error.message} `);
      }

      setFacts(facts);
      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      <NewFactForm
        CATEGORIES={CATEGORIES}
        setFacts={setFacts}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <main className="main">
        <CategoryFilters
          CATEGORIES={CATEGORIES}
          setCurrentCategory={setCurrentCategory}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList CATEGORIES={CATEGORIES} facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}
