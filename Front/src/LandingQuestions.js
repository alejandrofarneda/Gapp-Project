import useFetch from './useFetch';

export default function LandingQuestions() {
  const results = useFetch('http://localhost:4000/api/randomquestions');

  return (
    <>
      <div className="pos0">
        <div className="randquestion">{results && results[0].title}</div>
        <div className="randanswer">
          If you want to read the answers to this question, please login and
          enjoy all the benefits of being a Gapper.
        </div>
      </div>

      <div className="pos1">
        <div className="randquestion">{results && results[1].title}</div>
        <div className="randanswer">
          If you want to read the answers to this question, please login and
          enjoy all the benefits of being a Gapper. Come on in!
        </div>
      </div>
      <div className="pos2">
        <div className="randquestion">{results && results[2].title}</div>
        <div className="randanswer">
          If you want to read the answers to this question, please login and
          enjoy all the benefits of being a Gapper. It's free, come and join us!
        </div>
      </div>
      <div className="pos3">
        <div className="randquestion">{results && results[3].title}</div>
        <div className="randanswer">
          If you want to read the answers to this question, please login and
          enjoy all the benefits of being a Gapper. Every day hundreds of new
          questions and answers available. Pose your own questions and answers.
        </div>
      </div>
    </>
  );
}
