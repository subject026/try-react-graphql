import React from "react";

import AddSkill from "./components/AddSkill/AddSkill";
import { FindMember } from "./components/FindMember";
import Header from "./components/Header/Header";
import { useAppSelector } from "./store/hooks";

function App() {
  const appState = useAppSelector((state) => state);

  return (
    <main>
      <Header />
      <FindMember />
      {/* <AddSkill /> */}
      <h3 className="max-w-4xl m-auto px-8 mb-4 text-xl font-bold">
        Redux State
      </h3>
      <pre className="max-w-4xl m-auto p-8">
        {JSON.stringify(appState, null, 2)}
      </pre>
    </main>
  );
}

export default App;
