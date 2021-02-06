import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.title} - {product.price}
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps(context) {
  const options = {
    method: "POST",
    body: JSON.stringify({
      query: `query fetchProducts {
        product {
          id
          title
          price
        }
      }`,
      optionName: "fetchProducts",
    }),
  };
  const fetchResponse = await fetch(
    "https://talented-weasel-61.hasura.app/v1/graphql",
    options
  );
  const responseJson = await fetchResponse.json();
  const products = responseJson.data.product;

  return {
    props: {
      products: products,
    },
  };
}
