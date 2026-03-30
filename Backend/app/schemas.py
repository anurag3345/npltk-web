from typing import Any, Dict, List, Literal, Optional, Union

from pydantic import BaseModel, Field


class TextRequest(BaseModel):
    text: str = Field(..., min_length=1)


class TokenizeRequest(BaseModel):
    text: str = Field(..., min_length=1)
    mode: Literal["hybrid", "rule"] = "hybrid"
    split_into_sentences: bool = True
    keep_punct: bool = True
    subword: bool = True
    fallback_to_rule: bool = True


class TransformItem(BaseModel):
    rule: str
    before: str
    after: str


class NormalizeResponse(BaseModel):
    text: str
    transforms: List[TransformItem]


class TokenizeResponse(BaseModel):
    tokens: List[str]


class SentenceTokenizeResponse(BaseModel):
    sentences: List[Union[List[str], str]]


class StopwordResponse(BaseModel):
    filtered_tokens: List[str]
    info: Dict[str, Any]


class LemmatizeResponse(BaseModel):
    lemmas: List[str]


class POSTagItem(BaseModel):
    token: str
    tag: str


class POSResponse(BaseModel):
    pos_tags: List[POSTagItem]


class NERTagItem(BaseModel):
    token: str
    tag: str


class NEREntityItem(BaseModel):
    text: str
    label: str
    start: int
    end: int


class NERResponse(BaseModel):
    ner_tags: List[NERTagItem]
    entities: List[NEREntityItem]


class FullPipelineResponse(BaseModel):
    original_text: str
    normalized_text: str
    tokens: List[str]
    filtered_tokens: List[str]
    lemmas: List[str]
    pos_tags: List[POSTagItem]
    ner_tags: List[NERTagItem]
    entities: List[NEREntityItem]
    stopword_info: Dict[str, Any]
    transforms: List[TransformItem]