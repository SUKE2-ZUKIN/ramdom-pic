import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Loader } from "semantic-ui-react";

interface SearchImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialImageUrl: string;
}

const getRandomPicture = async (): Promise<SearchImage> => {
  const res = await fetch(`https://api.thecatapi.com/v1/images/search`);
  const result = await res.json();
  console.log(result[0]);
  return result[0];
};

const Home: NextPage<IndexPageProps> = ({ initialImageUrl }) => {
  const [imgUrl, setImgUrl] = useState(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const image = await getRandomPicture();
    console.log(image.url);
    setImgUrl(image.url);
    setIsLoading(false);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}>
      <h1>ランダム画像出力アプリ</h1>
      {isLoading ? (
        <Loader active size='huge' inline="centered" />
      ) : (
        <img 
          src={imgUrl}
          width={500}
          height="auto"
        />
      )}
      <button 
        style={{
          marginTop: 18
        }}
        onClick={handleClick}>画像出力</button>
    </div>
  )
}

// SSR
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const img = await getRandomPicture();
  return {
    props: {
      initialImageUrl: img.url,
    }
  };
};

export default Home
