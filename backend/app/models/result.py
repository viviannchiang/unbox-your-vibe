from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CompatibleType(BaseModel):
    type: str
    character: str
    figure: str


class PersonalityResult(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    type_code: str
    character: str
    figure_name: str
    series: str
    tagline: str
    description: str
    this_is_you: list[str]
    group_chat_vibe: str
    compatible_with: list[CompatibleType]
    color: str
    image: str


class ScoreResponse(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    type: str
    character: str
    figure_name: str
