from pydantic import BaseModel, EmailStr


class QuestionOut(BaseModel):
    id: int
    text: str
    options: list[str]

    class Config:
        from_attributes = True


class QuizStartRequest(BaseModel):
    email: EmailStr


class AnswerItem(BaseModel):
    question_id: int
    selected_index: int


class QuizSubmitRequest(BaseModel):
    email: EmailStr
    answers: list[AnswerItem]


class QuizResult(BaseModel):
    total_questions: int
    correct_answers: int
    passed: bool
    percentage: float


