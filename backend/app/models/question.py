from pydantic import BaseModel


# ── Internal models (include scores for scoring service) ──────────────────────

class CardOption(BaseModel):
    id: str
    label: str
    scores: dict[str, int]  # e.g. {"E": 1} or {"I": 1}


class Question(BaseModel):
    id: str
    text: str
    axis: str  # "EI", "SN", "TF", "JP"
    cards: list[CardOption]


class QuizSubmission(BaseModel):
    answers: list[dict]  # [{"question_id": "q1", "card_id": "q1_a"}, ...]


# ── Public models (scores stripped before sending to frontend) ─────────────────

class PublicCardOption(BaseModel):
    id: str
    label: str


class PublicQuestion(BaseModel):
    id: str
    text: str
    axis: str
    cards: list[PublicCardOption]
