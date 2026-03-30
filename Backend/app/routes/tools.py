from fastapi import APIRouter, HTTPException

from app.schemas import (
    TextRequest,
    TokenizeRequest,
    NormalizeResponse,
    TokenizeResponse,
    SentenceTokenizeResponse,
    StopwordResponse,
    LemmatizeResponse,
    POSResponse,
    NERResponse,
    FullPipelineResponse,
)
from app.services.npltk_service import (
    normalize_text,
    tokenize_text,
    tokenize_sentences,
    remove_stopwords,
    lemmatize_text,
    pos_tag_text,
    ner_tag_text,
    full_pipeline,
)

router = APIRouter(prefix="/tools", tags=["NPLTK Tools"])


@router.get("/health")
def health_check():
    return {"status": "ok", "message": "NPLTK FastAPI backend is running"}


@router.post("/normalize", response_model=NormalizeResponse)
def normalize(req: TextRequest):
    try:
        return normalize_text(req.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Normalization failed: {str(e)}")


@router.post("/tokenize", response_model=TokenizeResponse)
def tokenize(req: TokenizeRequest):
    try:
        tokens = tokenize_text(
            text=req.text,
            mode=req.mode,
            split_into_sentences=req.split_into_sentences,
            keep_punct=req.keep_punct,
            subword=req.subword,
            fallback_to_rule=req.fallback_to_rule,
        )
        return {"tokens": tokens}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tokenization failed: {str(e)}")


@router.post("/tokenize-sentences", response_model=SentenceTokenizeResponse)
def tokenize_sentencewise(req: TokenizeRequest):
    try:
        sentences = tokenize_sentences(
            text=req.text,
            mode=req.mode,
            split_into_sentences=req.split_into_sentences,
            keep_punct=req.keep_punct,
            subword=req.subword,
            fallback_to_rule=req.fallback_to_rule,
        )
        return {"sentences": sentences}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Sentence tokenization failed: {str(e)}"
        )


@router.post("/stopwords", response_model=StopwordResponse)
def stopwords(req: TokenizeRequest):
    try:
        return remove_stopwords(
            text=req.text,
            mode=req.mode,
            split_into_sentences=req.split_into_sentences,
            keep_punct=req.keep_punct,
            subword=req.subword,
            fallback_to_rule=req.fallback_to_rule,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Stopword removal failed: {str(e)}")


@router.post("/lemmatize", response_model=LemmatizeResponse)
def lemmatize(req: TokenizeRequest):
    try:
        stopword_result = remove_stopwords(
            text=req.text,
            mode=req.mode,
            split_into_sentences=req.split_into_sentences,
            keep_punct=req.keep_punct,
            subword=req.subword,
            fallback_to_rule=req.fallback_to_rule,
        )
        lemmas = lemmatize_text(stopword_result["filtered_tokens"])
        return {"lemmas": lemmas}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lemmatization failed: {str(e)}")


@router.post("/pos", response_model=POSResponse)
def pos(req: TokenizeRequest):
    try:
        return pos_tag_text(
            text=req.text,
            mode=req.mode,
            split_into_sentences=req.split_into_sentences,
            keep_punct=req.keep_punct,
            subword=req.subword,
            fallback_to_rule=req.fallback_to_rule,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"POS tagging failed: {str(e)}")


@router.post("/ner", response_model=NERResponse)
def ner(req: TokenizeRequest):
    try:
        return ner_tag_text(
            text=req.text,
            mode=req.mode,
            split_into_sentences=req.split_into_sentences,
            keep_punct=req.keep_punct,
            subword=req.subword,
            fallback_to_rule=req.fallback_to_rule,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"NER failed: {str(e)}")


@router.post("/pipeline", response_model=FullPipelineResponse)
def pipeline(req: TokenizeRequest):
    try:
        return full_pipeline(
            text=req.text,
            mode=req.mode,
            split_into_sentences=req.split_into_sentences,
            keep_punct=req.keep_punct,
            subword=req.subword,
            fallback_to_rule=req.fallback_to_rule,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline failed: {str(e)}")