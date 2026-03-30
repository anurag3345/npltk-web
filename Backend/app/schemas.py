from pydantic import BaseModel, Field
from typing import List, Optional, Any


class TextRequest(BaseModel):
    text: str = Field(..., min_length=1)


class TokenizeRequest(BaseModel):
    text: str = Field(..., min_length=1)
    mode: str = "hybrid"
    split_into_sentences: bool = True
    keep_punct: bool = True
    subword: bool = True
    fallback_to_rule: bool = True


class NormalizeResponse(BaseModel):
    text: str
    transforms: List[dict]


class TokenizeResponse(BaseModel):
    tokens: List[str]


class SentenceTokenizeResponse(BaseModel):
    sentences: List[Any]


class StopwordResponse(BaseModel):
    filtered_tokens: List[str]
    info: dict


class LemmatizeResponse(BaseModel):
    lemmas: List[str]


class FullPipelineResponse(BaseModel):
    original_text: str
    normalized_text: str
    tokens: List[str]
    filtered_tokens: List[str]
    lemmas: List[str]
    stopword_info: dict
    transforms: List[dict]