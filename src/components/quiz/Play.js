/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-plusplus */
/* eslint-disable no-constant-condition */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import classnames from 'classnames';
import M from 'materialize-css';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import buttonSound from '../../assets/audio/button-sound.mp3';
import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import isEmpty from '../../utils/is-empty';

const Play = (props) => {
    const [questions, setQuestions] = useState();
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [nextQuestion, setNextQuestion] = useState({});
    const [previousQuestion, setPreviousQuestion] = useState({});
    const [answer, setAnswer] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [hints, setHints] = useState(5);
    const [fiftyFifty, setFiftyFifty] = useState(2);
    const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true);
    const [previousRandomNumbers, setPreviousRandomNumbers] = useState([]);
    const [time, setTime] = useState({});

    const displayQuestions = (
        questions,
        currentQuestion,
        nextQuestion,
        previousQuestion
    ) => {
        
        if (!isEmpty(questions)) {
         
            setCurrentQuestion (questions[currentQuestionIndex]);
            setNextQuestion (questions[currentQuestionIndex + 1]);
            setPreviousQuestion(questions[currentQuestionIndex - 1]);
            const { answer } = currentQuestion;
            setQuestions(
                {
                    currentQuestion,
                    nextQuestion,
                    previousQuestion,
                    numberOfQuestions: questions.length,
                    answer,
                    previousRandomNumbers: [],
                },
                () => {
                    showOptions();
                    handleDisableButton();
                }
            );
        }
    };
    const handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === answer.toLowerCase()) {
            this.correctTimeout = setTimeout(() => {
                this.correctSound.current.play();
            }, 500);
            this.correctAnswer();
        } else {
            this.wrongTimeout = setTimeout(() => {
                this.wrongSound.current.play();
            }, 500);
            this.wrongAnswer();
        }
    };
    const handleNextButtonClick = () => {
        this.playButtonSound();
        if (nextQuestion !== undefined) {
            this.setState(
                (prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex + 1,
                }),
                () => {
                    this.displayQuestions(
                        this.state.state,
                        this.state.currentQuestion,
                        this.state.nextQuestion,
                        this.state.previousQuestion
                    );
                }
            );
        }
    };
    const handlePreviousButtonClick = () => {
        this.playButtonSound();
        if (previousQuestion !== undefined) {
            this.setState(
                (prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex - 1,
                }),
                () => {
                    this.displayQuestions(
                        this.state.state,
                        this.state.currentQuestion,
                        this.state.nextQuestion,
                        this.state.previousQuestion
                    );
                }
            );
        }
    };
    const handleQuitButtonClick = () => {
        this.playButtonSound();
        if (window.confirm('Are you sure you want to quit?')) {
            this.props.history.push('/');
        }
    };
    const handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next-button':
                this.handleNextButtonClick();
                break;
            case 'previous-button':
                this.handlePreviousButtonClick();
                break;
            case 'quit-button':
                this.handleQuitButtonClick();
                break;
            default:
                break;
        }
    };
    const playButtonSound = () => {
        this.buttonSound.current.play();
    };
    const correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500,
        });
        this.setState(
            (prevState) => ({
                score: prevState.score + 1,
                correctAnswers: prevState.correctAnswers + 1,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
            }),
            () => {
                if (nextQuestion === undefined) {
                    this.endGame();
                } else {
                    this.displayQuestions(
                        this.state.questions,
                        this.state.currentQuestion,
                        this.state.nextQuestion,
                        this.state.previousQuestion
                    );
                }
            }
        );
    };
    const wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500,
        });
        this.setState(
            (prevState) => ({
                wrongAnswers: prevState.wrongAnswers + 1,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
            }),
            () => {
                if (this.state.nextQuestion === undefined) {
                    this.endGame();
                } else {
                    this.displayQuestions(
                        this.state.questions,
                        this.state.currentQuestion,
                        this.state.nextQuestion,
                        this.state.previousQuestion
                    );
                }
            }
        );
    };
    const showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));
        options.forEach((option) => {
            option.style.visibility = 'visible';
        });
        this.setState({
            setUsedFiftyFifty: false,
        });
    };
    const handleHints = () => {
        if (hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;
            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });
            while (true) {
                const randomNumber = Math.round(Math.random() * 3);
                if (
                    randomNumber !== indexOfAnswer &&
                    !this.state.previousRandomNumbers.includes(randomNumber)
                ) {
                    options.forEach((option, index) => {
                        if (index === randomNumber) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(
                                    randomNumber
                                ),
                            }));
                        }
                    });
                    break;
                }
                if (this.state.previousRandomNumbers.length >= 3) break;
            }
        }
    };
    const handleFiftyFifty = () => {
        if (fiftyFifty > 0 && usedFiftyFifty === false) {
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;
            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });
            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (
                        randomNumbers.length < 2 &&
                        !randomNumbers.includes(randomNumber) &&
                        !randomNumbers.includes(indexOfAnswer)
                    ) {
                        randomNumbers.push(randomNumber);
                        count++;
                    } else {
                        while (true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if (
                                !randomNumbers.includes(newRandomNumber) &&
                                newRandomNumber !== indexOfAnswer
                            ) {
                                randomNumbers.push(newRandomNumber);
                                count++;
                                break;
                            }
                        }
                    }
                }
            } while (count < 2);
            options.forEach((option, index) => {
                if (randomNumbers.includes(index)) {
                    option.style.visibility = 'hidden';
                }
            });
            
                setFiftyFifty(prevState.fiftyFifty - 1),
                setUsedFiftyFifty(true),  
        };  
    };
    const startTimer = () => {
        const countDownTime = Date.now() + 300000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                clearInterval(this.interval);
                this.setState(
                    {
                        time: {
                            minutes: 0,
                            seconds: 0,
                        },
                    },
                    () => {
                        this.endGame();
                    }
                );
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds,
                        distance,
                    },
                });
            }
        }, 1000);
    };
    const handleDisableButton = () => {
        if (previousQuestion === undefined || currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true,
            });
        } else {
            this.setState({
                previousButtonDisabled: false,
            });
        }
        if (
            nextQuestion === undefined ||
            currentQuestionIndex + 1 === numberOfQuestions
        ) {
            this.setState({
                nextButtonDisabled: true,
            });
        } else {
            this.setState({
                nextButtonDisabled: false,
            });
        }
    };
    const endGame = () => {
        alert('Quiz has eneded!');
        const { state } = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            fiftyFiftyUsed: 2 - state.fiftyFifty,
            hintsUsed: 5 - state.hints,
        };
        setTimeout(() => {
            this.props.history.push('/play/quizSummary', playerStats);
        }, 1000);
    };
    
    return (
            <>
                <Helmet>
                    <title>Quiz Page</title>
                </Helmet>
                <>
                    <audio ref={this.correctSound} src={correctNotification} />
                    <audio ref={this.wrongSound} src={wrongNotification} />
                    <audio ref={this.buttonSound} src={buttonSound} />
                </>
                <div className="questions">
                    <h2>Quiz Mode</h2>
                    <div className="lifeline-container">
                        <p>
                            <span
                                onClick={() => handleFiftyFifty()}
                                className="mdi mdi-set-center mdi-24px lifeline-icon"
                            >
                                <span className="lifeline">{fiftyFifty}</span>
                            </span>
                        </p>
                        <p>
                            <span
                                onClick={this.handleHints}
                                className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
                            >
                                <span className="lifeline">{hints}</span>
                            </span>
                        </p>
                    </div>
                    <div className="timer-container">
                        <p>
                            <span className="left" style={{ float: 'left' }}>
                                {currentQuestionIndex + 1} of {numberOfQuestions}
                            </span>
                            <span
                                className={classnames('right valid', {
                                    warning: time.distance <= 120000,
                                    invalid: time.distance < 30000,
                                })}
                            >
                                {time.minutes}:{time.seconds}
                                <span className="mdi mdi-clock-outline mdi-24px" />
                            </span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">
                            {currentQuestion.optionA}
                        </p>
                        <p onClick={this.handleOptionClick} className="option">
                            {currentQuestion.optionB}
                        </p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">
                            {currentQuestion.optionC}
                        </p>
                        <p onClick={this.handleOptionClick} className="option">
                            {currentQuestion.optionD}
                        </p>
                    </div>
                    <div className="button-container">
                        <button
                            className={classnames('', {
                                disable: this.state.previousButtonDisabled,
                            })}
                            id="previous-button"
                            onClick={this.handleButtonClick}
                        >
                            Previous
                        </button>
                        <button
                            className={classnames('', { disable: this.state.nextButtonDisabled })}
                            id="next-button"
                            onClick={this.handleButtonClick}
                        >
                            Next
                        </button>
                        <button id="quit-button" onClick={this.handleButtonClick}>
                            Quit
                        </button>
                    </div>
                </div>
            </>
        );
    };


export default Play;
