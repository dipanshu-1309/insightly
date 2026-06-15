export default function Header({ showForm, setShowForm }) {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img
            src="/src/assets/logo.png"
            height="68"
            width="68"
            alt="Today I Learned Logo"
          />
          <h1>INSIGHTLY</h1>
        </div>

        <button
          className="btn btn-large btn-open"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "CLOSE" : "SHARE A FACT"}
        </button>
      </header>
    </>
  );
}
