
import BigBanner from "../../../../Components/BigBanner";
import MedNewsBox from "../../../../Components/MedNewsBox";
import MedNewsBox2 from "../../../../Components/MedNewsBoxTwo";
import RecentBanner from "../../../../Components/RecentBanner";
import Trending from "../../../../Components/Trending";
import SmallBanner from "../../../../Components/SmallBanner";
import  fetchNewsData  from "../../api/api";

export async function generateMetadata(context) {
  return {
    title: context.params.id,
    description: ` Unveil the latest advancements in PC hardware technology with Hardware Genus in ${context.params.id} Section! Explore a diverse range of components, peripherals, and innovations that power the heart of your computer. From high-performance processors to graphics cards that redefine gaming, our Hardware Section offers in-depth reviews, guides, and comparisons. Stay ahead of the curve and make informed decisions for building your dream rig. Delve into the world of PC hardware with Hardware Genus today!`,
    keywords: [ "Gaming News 2023", "Hardware News 2023", "Mobiles 2023", "Tech News 2023", "Hardware Genus", "Gaming USA", "PC"],
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
  }
}


export default async function Home({ params }) {


    const data = await fetchNewsData();
    // console.log(data)
    const slugOfNavbar = params.id
    const newsData = data

  return (

    
    <>

      <main>

     
        {newsData && <BigBanner newsData={newsData} slugOfNavbar={slugOfNavbar}  />}
        {newsData && <MedNewsBox newsData={newsData} slugOfNavbar={slugOfNavbar} />}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {newsData && <RecentBanner newsData={newsData} slugOfNavbar={slugOfNavbar} />}
        </div>

        {newsData && <Trending newsData={newsData} slugOfNavbar={slugOfNavbar} />}

        <div style={{ marginTop: 60 }}>
          {newsData && <MedNewsBox2 newsData={newsData} slugOfNavbar={slugOfNavbar} />}
        </div>

        {newsData && <SmallBanner newsData={newsData} slugOfNavbar={slugOfNavbar} />}
       
      </main>
    </>
  );
}



 

