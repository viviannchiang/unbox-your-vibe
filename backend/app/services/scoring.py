MBTI_TO_CHARACTER = {
    "INFP": "Nyota", "INFJ": "Nyota", "ISFP": "Nyota", "ISFJ": "Nyota",
    "INTJ": "Hirono", "INTP": "Hirono", "ENTJ": "Hirono", "ISTP": "Hirono",
    "ENFP": "Lulu", "ENTP": "Hirono", "ENFJ": "Nyota", "ESTP": "Lulu",
    "ESFJ": "Lulu", "ESFP": "Lulu", "ESTJ": "Lulu", "ISTJ": "Lulu",
}

# Ties default to I, N, F, P
TIE_DEFAULTS = {"EI": "I", "SN": "N", "TF": "F", "JP": "P"}


def score_answers(answers: list[dict], questions_data: list[dict]) -> tuple[str, str]:
    """Return (mbti_type, character) from a list of {question_id, card_id} answers."""
    question_map = {q["id"]: q for q in questions_data}
    axis_scores: dict[str, dict[str, int]] = {
        "EI": {"E": 0, "I": 0},
        "SN": {"S": 0, "N": 0},
        "TF": {"T": 0, "F": 0},
        "JP": {"J": 0, "P": 0},
    }

    for answer in answers:
        q = question_map.get(answer["question_id"])
        if not q:
            continue
        card = next((c for c in q["cards"] if c["id"] == answer["card_id"]), None)
        if not card:
            continue
        axis = q["axis"]
        for pole, pts in card["scores"].items():
            axis_scores[axis][pole] += pts

    result = ""
    for axis, poles in axis_scores.items():
        p1, p2 = axis[0], axis[1]
        if poles[p1] > poles[p2]:
            result += p1
        elif poles[p2] > poles[p1]:
            result += p2
        else:
            result += TIE_DEFAULTS[axis]

    character = MBTI_TO_CHARACTER.get(result, "Nyota")
    return result, character
