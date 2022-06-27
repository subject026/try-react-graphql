import React from "react";

import apiClient from "./api/axios";

function App() {
  const [results, setResults] = React.useState([]);
  const [selectValue, setSelectValue] = React.useState(null);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectValue(value);
  };

  React.useEffect(() => {
    if (!selectValue) return;
    console.log("value selected: ", selectValue);
    apiClient({
      data: {
        query: `
          query {
            ${selectValue} {
              results {
                name
              }
            }
          }
        `,
      },
    })
      .then((res) => {
        const data = res.data.data;
        const { characters, locations, episodes } = data;
        let results;
        if (characters) results = characters.results;
        if (episodes) results = episodes.results;
        if (locations) results = locations.results;
        setResults([...results]);
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  }, [selectValue]);
  return (
    <main>
      <header className="bg-[#e10098]">
        <h1 className="max-w-4xl px-8 m-auto py-4 text-2xl font-bold text-neutral-300">
          RickandmortyQL &#8482;
        </h1>
      </header>
      <section className="max-w-4xl p-8 m-auto">
        Choose some info to fetch:
        <select
          className="ml-8"
          name="information"
          id="information"
          onChange={handleSelectChange}
        >
          <option> </option>
          <option value="characters">Characters</option>
          <option value="locations">Locations</option>
          <option value="episodes">Episodes</option>
        </select>
      </section>
      <section className="max-w-4xl px-8 m-auto py-4">
        {results.length > 0 &&
          results.map((character, i) => {
            return (
              <p key={i} className="mb-1">
                {character.name}
              </p>
            );
          })}
      </section>
    </main>
  );
}

export default App;
