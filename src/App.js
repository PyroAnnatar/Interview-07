import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  async function fetchy(url) {
    try {
      const data = await axios.get(url);
      setData(data.data.results);
      setFiltered(data.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    setSearch(query);
    setFiltered(() => {
      if (query === "") {
        return data;
      } else {
        const filteredData = data.filter((person) =>
          `${person.name.first} ${person.name.last}`
            .toLowerCase()
            .trim()
            .includes(query)
        );

        return filteredData;
      }
    });
  }

  useEffect(() => {
    fetchy("https://randomuser.me/api?results=10");
  }, []);
  return (
    <div className="grid gap-4">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search users"
        className="border-[1px] border-black pl-1"
      />

      {filtered.map((person) => (
        <div key={person.login.uuid}>
          <p>{`${person.name.title} ${person.name.first}`}</p>
          <p>{person.name.last}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
