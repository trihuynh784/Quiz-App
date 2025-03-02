import { getTopics } from "../../services/topics";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Topics.scss";

function PageTopics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTopics();
      setTopics(result);
    };
    fetchApi();
  }, []);

  return (
    <div className="container">
      <table className="table__topics">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên chủ đề</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {topics.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td><Link to={"/quiz/" + (item.id)}>Làm bài</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PageTopics;
