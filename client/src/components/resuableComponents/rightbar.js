import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./spinner";

const Rightbar = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [fetching1, setFetching1] = useState(true);
  const [fetching2, setFetching2] = useState(true);

  useEffect(() => {
    const fetch1 = async () => {
      const res = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=0879d2e09894441aa4555f13cb825be7"
      );
      setData1(res.data.articles.slice(0, 10));
      setFetching1(false);
    };
    const fetch2 = async () => {
      const res = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=0879d2e09894441aa4555f13cb825be7"
      );
      setData2(res.data.articles.slice(0, 10));
      setFetching2(false);
    };
    fetch1();
    fetch2();
  }, []);

  return (
    <div className="rightBarContent">
      <div className="rightBarSection">
        <h2>Latest In India</h2>
        <div className="rightBarSectionItem">
          {fetching1 === true ? (
            <Spinner />
          ) : (
            data1.map((e, index) => {
              return (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener"
                  className="rightBarItem"
                  key={`India${index}`}
                >
                  <div className="itemText">
                    <h4>{e.title.substring(0, e.title.lastIndexOf("-"))}</h4>
                    <h5>{e.source.name}</h5>
                  </div>
                  <div className="itemImg">
                    <img src={e.urlToImage} />
                  </div>
                </a>
              );
            })
          )}
        </div>

        <h2>Latest In US</h2>
        <div className="rightBarSectionItem">
          {fetching2 === true ? (
            <Spinner />
          ) : (
            data2.map((e, index) => {
              return (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener"
                  className="rightBarItem"
                  key={`US${index}`}
                >
                  <div className="itemText">
                    <h4>{e.title.substring(0, e.title.lastIndexOf("-"))}</h4>
                    <h5>{e.source.name}</h5>
                  </div>
                  <div className="itemImg">
                    <img src={e.urlToImage} />
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Rightbar;
