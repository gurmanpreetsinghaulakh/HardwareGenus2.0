
import BigBanner from "../../Components/BigBanner";
import MedNewsBox from "../../Components/MedNewsBox";
import MedNewsBox2 from "../../Components/MedNewsBoxTwo";
import RecentBanner from "../../Components/RecentBanner";
import Trending from "../../Components/Trending";
import SmallBanner from "../../Components/SmallBanner";
import  fetchNewsData  from "./api/api";
import BackToTop from "../../Components/Features/BackToTop";


export default async function Home() {


 const newsData = await fetchNewsData();


    
  return (
    <>


  
      <main>

      
        {newsData && <BigBanner newsData={newsData} />}
        <BackToTop/>

        {newsData && <MedNewsBox newsData={newsData} />}


        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {newsData && <RecentBanner newsData={newsData} />}
        </div>

        {newsData && <Trending newsData={newsData} />}

        <div style={{ marginTop: 60 }}>
          {newsData && <MedNewsBox2 newsData={newsData} />}
        </div>

        {newsData && <SmallBanner newsData={newsData} />}

 

      </main>


    </>
  );
}




