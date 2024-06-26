import createApolloClient from "../libs/apollo-client";
import { gql } from "@apollo/client";

async function loadData() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          results {
            id
            name
            image
          }
        }
      }
    `,
  });

  return data.characters.results;
}

async function HomePage() {
  const characters = await loadData();

  return (
    <div className="grid place-items-center">
      <h2 className="m-10">Server side rendering</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {characters.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.image}></img>
            <h3 className="text-center"> {character.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
