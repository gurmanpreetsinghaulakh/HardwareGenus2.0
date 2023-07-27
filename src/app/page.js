import dynamic from "next/dynamic";
import BigBanner from "../../Components/BigBanner";
import MedNewsBox from "../../Components/MedNewsBox";
// import MedNewsBox2 from "../../Components/MedNewsBoxTwo";
// import RecentBanner from "../../Components/RecentBanner";
// import Trending from "../../Components/Trending";
// import SmallBanner from "../../Components/SmallBanner";
import BackToTop from "../../Components/Features/BackToTop";
import  fetchNewsData  from "./api/api";


const RecentBanner = dynamic(()=> import('../../Components/RecentBanner'))
const Trending = dynamic(()=> import('../../Components/Trending'))
const MedNewsBox2 = dynamic(()=> import('../../Components/MedNewsBoxTwo'))
const SmallBanner = dynamic(()=> import('../../Components/SmallBanner'))

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




