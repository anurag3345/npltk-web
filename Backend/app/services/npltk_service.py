from typing import List, Dict, Any

from npltk import create_tokenizer, Lemmatizer
from npltk.stop_word.remover import StopWordRemover
from npltk.normalizer import build_normalizer


def normalize_text(text: str) -> Dict[str, Any]:
    result = build_normalizer().normalize(text)

    transforms = []
    for t in getattr(result, "transforms", []):
        transforms.append(
            {
                "rule": getattr(t, "rule", ""),
                "before": getattr(t, "before", ""),
                "after": getattr(t, "after", ""),
            }
        )

    return {
        "text": result.text,
        "transforms": transforms,
    }


def get_tokenizer(
    mode: str = "hybrid",
    split_into_sentences: bool = True,
    keep_punct: bool = True,
    subword: bool = True,
    fallback_to_rule: bool = True,
):
    return create_tokenizer(
        mode=mode,
        split_into_sentences=split_into_sentences,
        keep_punct=keep_punct,
        subword=subword,
        fallback_to_rule=fallback_to_rule,
    )


def tokenize_text(
    text: str,
    mode: str = "hybrid",
    split_into_sentences: bool = True,
    keep_punct: bool = True,
    subword: bool = True,
    fallback_to_rule: bool = True,
) -> List[str]:
    tokenizer = get_tokenizer(
        mode=mode,
        split_into_sentences=split_into_sentences,
        keep_punct=keep_punct,
        subword=subword,
        fallback_to_rule=fallback_to_rule,
    )
    tokens = tokenizer.tokenize(text)
    return [getattr(t, "text", str(t)) for t in tokens]


def tokenize_sentences(
    text: str,
    mode: str = "hybrid",
    split_into_sentences: bool = True,
    keep_punct: bool = True,
    subword: bool = True,
    fallback_to_rule: bool = True,
):
    tokenizer = get_tokenizer(
        mode=mode,
        split_into_sentences=split_into_sentences,
        keep_punct=keep_punct,
        subword=subword,
        fallback_to_rule=fallback_to_rule,
    )
    result = tokenizer.tokenize_sentences(text)

    output = []
    for sentence in result:
        if isinstance(sentence, list):
            output.append([getattr(t, "text", str(t)) for t in sentence])
        else:
            output.append(str(sentence))
    return output


def remove_stopwords(
    text: str,
    mode: str = "hybrid",
    split_into_sentences: bool = True,
    keep_punct: bool = True,
    subword: bool = True,
    fallback_to_rule: bool = True,
) -> Dict[str, Any]:
    tokenizer = get_tokenizer(
        mode=mode,
        split_into_sentences=split_into_sentences,
        keep_punct=keep_punct,
        subword=subword,
        fallback_to_rule=fallback_to_rule,
    )
    tokens = tokenizer.tokenize(text)

    remover = StopWordRemover()
    filtered_tokens, info = remover.remove(tokens)

    return {
        "filtered_tokens": [getattr(t, "text", str(t)) for t in filtered_tokens],
        "info": info if isinstance(info, dict) else {"details": str(info)},
    }


def lemmatize_text(words: List[str]) -> List[str]:
    lemmatizer = Lemmatizer()
    return [lemmatizer.lemmatize(word) for word in words]


def full_pipeline(
    text: str,
    mode: str = "hybrid",
    split_into_sentences: bool = True,
    keep_punct: bool = True,
    subword: bool = True,
    fallback_to_rule: bool = True,
) -> Dict[str, Any]:
    normalized = normalize_text(text)
    normalized_text = normalized["text"]

    tokenizer = get_tokenizer(
        mode=mode,
        split_into_sentences=split_into_sentences,
        keep_punct=keep_punct,
        subword=subword,
        fallback_to_rule=fallback_to_rule,
    )

    tokens = tokenizer.tokenize(normalized_text)
    token_texts = [getattr(t, "text", str(t)) for t in tokens]

    remover = StopWordRemover()
    filtered_tokens, info = remover.remove(tokens)
    filtered_texts = [getattr(t, "text", str(t)) for t in filtered_tokens]

    lemmatizer = Lemmatizer()
    lemmas = [lemmatizer.lemmatize(word) for word in filtered_texts]

    return {
        "original_text": text,
        "normalized_text": normalized_text,
        "tokens": token_texts,
        "filtered_tokens": filtered_texts,
        "lemmas": lemmas,
        "stopword_info": info if isinstance(info, dict) else {"details": str(info)},
        "transforms": normalized["transforms"],
    }