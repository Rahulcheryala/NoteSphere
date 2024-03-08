// import React, { useContext, useEffect } from "react";
// import NoteContext from "../context/notes/noteContext";

// const Home = () => {
//   const currentState = useContext(NoteContext);
//   useEffect(() => {
//     currentState.updateFunction();
//   }, []);

//   return (
//     <>
//       <div>
//         Home {currentState.state.name}, {currentState.state.roll}
//       </div>
//     </>
//   );
// };

// export default Home;

import React from "react";
import Notes from "../components/Notes";

const Home = () => {
  return (
    <>
      <div>
        <Notes />
      </div>
    </>
  );
};

export default Home;
