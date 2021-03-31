import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/quiz/Play';
import QuizInstructions from './components/quiz/QuizInstructions';
import QuizSummary from './components/quiz/QuizSummary';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/play/instructions" exact component={QuizInstructions} />
                <Route path="/play/quiz" exact component={Play} />
                <Route path="/play/quizSummary" exact component={QuizSummary} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
