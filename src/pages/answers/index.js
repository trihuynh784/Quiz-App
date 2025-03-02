import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Answers.scss";
import { getAnswersByUserId } from "../../services/answers";
import { getTopics } from "../../services/topics";

function PageAnswers() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getAnswersList = await getAnswersByUserId();
      const topics = await getTopics();

      let result = [];

      for (let i = 0; i < getAnswersList.length; i++) {
        result.push({
          ...topics.find((item) => item.id === getAnswersList[i].topicId),
          ...getAnswersList[i],
        });
      }

      setAnswers(result.reverse());
    };
    fetchApi();
  }, []);

  return (
    <div className="container">
      <h3>Danh sách chủ đề đã luyện tập</h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên chủ đề</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {answers.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Link to={"/result/" + (item.id)}>Xem chi tiết</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PageAnswers;
