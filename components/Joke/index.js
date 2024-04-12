import { useEffect, useState } from "react";
import useSWR from "swr";

// fetcher deconstructed, how it works
// const fetcher = async (url) => {
//   const response = await fetch(url);
//   const joke = await response.json();
//   return joke;
// };

export default function Joke() {
  // const [joke, setJoke] = useState();
  const [id, setId] = useState(0);
  const { data } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );
  const [jokesInfo, setJokesInfo] = useState([]);

  // null coalescence operator
  // const item = response.json() ?? {};
  
  // useEffect(() => {
  //   async function startFetching() {
  //     const response = await fetch(
  //       `https://example-apis.vercel.app/api/bad-jokes/${id}`
  //     );
  //     const joke = await response.json();

  //     setJoke(joke);
  //   }

  //   startFetching();
  // }, [id]);

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  function handleToggleFunny(id){
    // console.log("ha ha ha, so funny");
    setJokesInfo((jokesInfo) => {
      const info = jokesInfo.find((info) => info.id === id);
      if(info){
        return jokesInfo.map((info) => info.id === id ? {...info, isFunny: !info.isFunny} : info);
      }
      return [...jokesInfo, {id, isFunny: true}];
    });
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const info = jokesInfo.find((info) => info.id === id) ?? {
    isFunny: false,
  }
  const { isFunny} = info;

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke}</h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={() => handleToggleFunny(id)}>{isFunny ? "🤣" : "🥱"}</button>

        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
