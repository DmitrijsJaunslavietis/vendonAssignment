export interface Test {
    id: number;
    name: string;
}
export interface Question { 
    id: number;
    testId: number;
    question: string;
}

export interface QuestionWithAnswers extends Question { //???
    answers: Answer[];
}

export interface Answer {
    id: number;
    questionId: number;
    answer: string;
}

export interface TestInstance {
    id: string;
    user: string;
    testId: number;
    answers: UserAnswer[];
    finished: boolean;
}

export interface UserAnswer extends Answer {
    userAnswerId: number;//???
    correctAnswerId?: number;
}

export interface UserTests {
    user: string;
    testInstances: TestInstance[];
}

export interface CorrectAnswer {
    correctAnswerId: number;
    questionId: number;
}