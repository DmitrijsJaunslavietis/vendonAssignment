export interface Assessment {
    id: number;
    name: string;
}
export interface Question {
    id: number;
    question: string;
    answers: Answer[];
    result?: UserAnswer;
}

export interface Answer {
    id: number;
    answer: string;
}

export interface AssessmentInstance {
    id: string;
    user: string;
    assessmentId: number;
    questions: Question[];
    finished: boolean;
}

export interface UserAnswer {
    userAnswerId: number;
    correctAnswerId?: number;
}

export interface UserTests {
    user: string;
    assessmentInstances: AssessmentInstance[];
}

export interface CorrectAnswer {
    correctAnswerId: number;
    questionId: number;
}
