/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const QuizSummary = (props) => {
    const [score, setScore] = useState(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(0);


    useEffect( () => {
        const { state } = props.location;
        if (state) {
            setState({
                setScore(score/numberOfQuestions * 100),
                setNumberOfQuestions(numberOfQuestions),
                setNumberOfAnsweredQuestions(numberOfAnsweredQuestions),
                setCorrectAnswers(correctAnswers),
                setWrongAnswers(wrongAnswers),
                setHintsUsed(hintsUsed),
                setFiftyFiftyUsed(fiftyFiftyUsed)
            });
        };
    }, [] );

    return(
        <>
     
        const { state } = props.location;
        let stats;
        let remark;
        const userScore = this.state.score;

        if (userScore <= 30) {
            remark = 'You need more practice!';
        } else if (userScore > 30 && userScore <= 50) {
            remark = 'Better luck next time!';
        } else if (userScore <= 70 && userScore > 50) {
            remark = 'You can do better!';
        } else if (userScore >= 71 && userScore <= 84) {
            remark = 'You did great!';
        } else {
            remark = "You're an absolute genius!";
        }

        if (state !== undefined) {
            stats = (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <span className="mdi mdi-check-circle-outline success-icon" />
                    </div>
                    <h1>Quiz has ended</h1>
                    <div className="container stats">
                        <h4>{remark}</h4>
                        <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total number of questions: </span>
                        <span className="right">{this.state.numberOfQuestions}</span>
                        <br />
                        <span className="stat left">Number of attempted questions: </span>
                        <span className="right">{this.state.numberOfAnsweredQuestions}</span>
                        <br />
                        <span className="stat left">Number of Correct Answers: </span>
                        <span className="right">{this.state.correctAnswers}</span> <br />
                        <span className="stat left">Number of Wrong Answers: </span>
                        <span className="right">{this.state.wrongAnswers}</span>
                        <br />
                        <span className="stat left">Hints Used: </span>
                        <span className="right">{this.state.hintsUsed}</span>
                        <br />
                        <span className="stat left">50-50 Used: </span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span>
                    </div>
                    <section>
                        <ul>
                            <li>
                                <Link to="/play/quiz">Play Again</Link>
                            </li>
                            <li>
                                <Link to="/">Back to Home</Link>
                            </li>
                        </ul>
                    </section>
                </>
            );
        } else {
            stats = (
                <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li>
                            <Link to="/play/quiz">Take a Quiz</Link>
                        </li>
                        <li>
                            <Link to="/">Back to Home</Link>
                        </li>
                    </ul>
                </section>
            );
        }
        return (
            <>
                <Helmet>
                    <title>Quiz App - Summary</title>
                </Helmet>
                <div className="quiz-summary">{stats}</div>
            </>
        );
    }
}
</>
);

export default QuizSummary;
