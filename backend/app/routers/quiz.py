import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.models.question import PublicQuestion, QuizSubmission
from app.models.result import PersonalityResult, ScoreResponse
from app.services.scoring import score_answers

router = APIRouter(prefix="/api/quiz", tags=["quiz"])

DATA_DIR = Path(__file__).parent.parent / "data"


def _load_questions() -> list[dict]:
    with open(DATA_DIR / "questions.json") as f:
        return json.load(f)


def _load_personalities() -> dict:
    with open(DATA_DIR / "personalities.json") as f:
        return json.load(f)


def _slugify(name: str) -> str:
    return name.lower().replace("'", "").replace(" ", "-")


@router.get("/questions", response_model=list[PublicQuestion])
def get_questions():
    questions = _load_questions()
    # Strip scores before sending to frontend
    public = []
    for q in questions:
        cards = [{"id": c["id"], "label": c["label"]} for c in q["cards"]]
        public.append({**q, "cards": cards})
    return public


@router.post("/score")
def score_quiz(submission: QuizSubmission):
    questions = _load_questions()
    type_code, character = score_answers(submission.answers, questions)

    personalities = _load_personalities()
    profile = personalities.get(type_code, {})
    figure_name = profile.get("figure_name", "")

    result = ScoreResponse(type=type_code, character=character, figure_name=figure_name)
    return JSONResponse(content=result.model_dump(by_alias=True))


@router.get("/result/figure/{slug}")
def get_result_by_figure(slug: str):
    """Look up a personality profile by figure name slug (e.g. 'cloudwatcher', 'sanctuary-star')."""
    personalities = _load_personalities()
    for profile in personalities.values():
        if _slugify(profile.get("figure_name", "")) == slug.lower():
            result = PersonalityResult.model_validate(profile)
            return JSONResponse(content=result.model_dump(by_alias=True))
    raise HTTPException(status_code=404, detail=f"No figure found for slug '{slug}'")


@router.get("/result/{type_code}")
def get_result(type_code: str):
    """Look up a personality profile by MBTI type code (internal use only)."""
    personalities = _load_personalities()
    profile = personalities.get(type_code.upper())
    if not profile:
        raise HTTPException(status_code=404, detail=f"No result for type {type_code}")
    result = PersonalityResult.model_validate(profile)
    return JSONResponse(content=result.model_dump(by_alias=True))
