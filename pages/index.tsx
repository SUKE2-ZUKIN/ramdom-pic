import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

interface SearchImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const Home: NextPage = () => {
  const [imgUrl, setImgUrl] = useState("");

  const getRandomPicture = async (): Promise<SearchImage> => {
    const res = await fetch(`https://api.thecatapi.com/v1/images/search`);
    const result = await res.json();
    console.log(result[0]);
    return result[0];
  };

  const handleClick = async () => {
    const image = await getRandomPicture();
    console.log(image.url);
    setImgUrl(image.url);
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
      <img 
        src={imgUrl}
        width={500}
        height="auto"
      />
      <button 
        style={{
          marginTop: 18
        }}
        onClick={handleClick}>画像出力</button>
    </div>
  )
}

export default Home
