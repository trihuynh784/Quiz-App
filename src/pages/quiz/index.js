import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListQuestion } from "../../services/questions";
import { getTopic } from "../../services/topics";
import { getCookie } from "../../helpers/cookie";
import { postAnswer } from "../../services/answers";

function PageQuiz() {
  const params = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getQuestionList = await getListQuestion(params.id);
      const getTopicCurrent = await getTopic(params.id);
      setQuestions(getQuestionList);
      setTopic(getTopicCurrent);
    };
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let selectedAnswers = [];

    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        selectedAnswers.push({ questionId: parseInt(name), answer: parseInt(value), });
      }
    }

    const options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers,
    };

    const result = await postAnswer(options);
    if(result) navigate("/result/" + (result.id));
  };

  return (
    <div className="container">
      {topic.length > 0 && <h2>Bài Quiz chủ đề: {topic[0].name}</h2>}
      {questions.length > 0 && (
        <form onSubmit={handleSubmit} className="quiz">
          {questions.map((item, index) => (
            <div className="quiz__item" key={index}>
              <p>
                Câu {index + 1}: {item.question}
              </p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="quiz__item--answers" key={indexAns}>
                  <input
                    type="radio"
                    key={index}
                    name={item.id}
                    value={indexAns}
                    id={`quiz-${item.id}-${indexAns}`}
                    required
                  />
                  <label htmlFor={`quiz-${item.id}-${indexAns}`}>
                    {itemAns}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Nộp bài</button>
        </form>
      )}
    </div>
  );
}

export default PageQuiz;
