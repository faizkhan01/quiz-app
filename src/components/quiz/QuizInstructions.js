import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const QuizInstructions = () => (
    <>
        <Helmet>
            <title> Quiz Instructions - Quiz-App </title>
        </Helmet>
        <div className="instructions container">
            <h1>How to Play The Game...</h1>
            <h4>Please ensure you read the whole guide from start to end.</h4>
            <ul className="browser-default" id="main-list">
                <li>
                    The game has a duration of 15 minutes and ends as soon as your time elapses.
                </li>
                <li>Each game consistes of 15 questions.</li>
                <li>Every Question contains 4 options.</li>
                <li>Select the most correct answer among the 4 options.</li>
                <li>
                    Each game has 2 lifelines namely:
                    <ul id="sublist">
                        <li>2 50-50 chances </li>
                        <li> 5 Hints </li>
                    </ul>
                </li>
                <li>
                    Selecting a 50-50 lifetime by clicking the icon
                    <span className="mdi mdi-set-center mdi-24px lifeline-icon"> </span>
                    will remove 2 wrong answers, leaving the correct answer and one wrong answer.
                </li>
                <li>
                    Using a hint by clicking the icon
                    <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"> </span>
                    will remove one wrong answer leaving two wrong answers and one correct answer.
                    You can use as many hints as possible on a single question.
                </li>
                <li>
                    Feel free to quit the game at any time. In that case your score will be revealed
                    afterwards.
                </li>
                <li>The times will start as soon as the game loads.</li>
                <li>Lets do this if you think you have got what it takes.</li>
            </ul>
            <div>
                <span className="left">
                    <Link to="/"> No take me back </Link>
                </span>
                <span className="right">
                    <Link to="/play/quiz"> Okay, Lets do this </Link>
                </span>
            </div>
        </div>
    </>
);

export default QuizInstructions;
