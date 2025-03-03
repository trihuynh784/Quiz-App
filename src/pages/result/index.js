import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnswersById } from "../../services/answers";
import { getListQuestion } from "../../services/questions";
import "./Result.scss";

function PageResult() {
  const params = useParams();
  const [totalTrue, setTotalTrue] = useState(0);
  const [totalFalse, setTotalFalse] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [topicId, setTopicId] = useState(0);
  const [dataAnswers, setDataAnswers] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const answersUser = await getAnswersById(params.id);
      const answersQuestion = await getListQuestion(answersUser.topicId);

      let result = [];
      for (let i = 0; i < answersQuestion.length; i++)
        result.push({
          ...answersQuestion[i],
          ...answersUser.answers.find(
            (item) => item.questionId === answersQuestion[i].id
          ),
        });
      setDataAnswers(result);
    };
    fetchApi();
  });

  useEffect(() => {
    if (dataAnswers.length > 0) {
      const tolQues = dataAnswers.length;
      const tolTrue = dataAnswers.filter(
        (item) => item.answer === item.correctAnswer
      ).length;
      const tolFalse = tolQues - tolTrue;

      setTotalQuestion(tolQues);
      setTotalTrue(tolTrue);
      setTotalFalse(tolFalse);
    }
  }, [dataAnswers]);

  useEffect(() => {
    if (dataAnswers.length > 0) {
      setTopicId(dataAnswers[0].topicId);
    }
  }, [dataAnswers]);

  return (
    <div className="container">
      <h2>Kết quả: </h2>
      <p>
        Đúng: <strong>{totalTrue}</strong> | Sai: <strong>{totalFalse}</strong>{" "}
        | Tổng số câu: <strong>{totalQuestion}</strong> | Tỷ lệ đúng:{" "}
        <strong>{(totalTrue / totalQuestion) * 100}%</strong>
      </p>
      {dataAnswers.length > 0 &&
        dataAnswers.map((item, index) => (
          <div className="quiz__item" key={index}>
            <p>
              Câu {index + 1}: {item.question}
              {item.answer === item.correctAnswer ? (
                <span className="quiz__item--true">Đúng</span>
              ) : (
                <span className="quiz__item--false">Sai</span>
              )}
            </p>
            {item.answers.map((itemAns, indexAns) => {
              let checked = false;
              let className = "";

              if (item.answer == indexAns) {
                checked = true;
                className += " quiz__item--selected";
              }

              if (item.correctAnswer == indexAns) {
                className += " quiz__item--result";
              }

              return (
                <div className="quiz__item--answer" key={indexAns}>
                  <input
                    className={className}
                    checked={checked}
                    disabled
                    type="radio"
                  />
                  <label className={className}>{itemAns}</label>
                </div>
              );
            })}
          </div>
        ))}
      {dataAnswers.length && (
        <Link className="link link-btn" to={"/quiz/" + topicId}>
          Làm lại
        </Link>
      )}
    </div>
  );
}

export default PageResult;
