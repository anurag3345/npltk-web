from typing import Any, Dict, List

from npltk import create_tokenizer, Lemmatizer, POSTagger, NERTagger
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


def pos_tag_text(
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

    pos_tagger = POSTagger()
    raw_pos = pos_tagger.tag_with_tokens(token_texts)

    pos_tags = []
    for item in raw_pos:
        if isinstance(item, dict):
            pos_tags.append(
                {
                    "token": str(item.get("token", "")),
                    "tag": str(item.get("tag", "")),
                }
            )
        elif isinstance(item, (list, tuple)) and len(item) >= 2:
            pos_tags.append(
                {
                    "token": str(item[0]),
                    "tag": str(item[1]),
                }
            )
        else:
            raise ValueError(f"Unsupported POS tagger output format: {item}")

    return {"pos_tags": pos_tags}


def ner_tag_text(
    text: str,
    mode: str = "hybrid",
    split_into_sentences: bool = True,
    keep_punct: bool = True,
    subword: bool = True,
    fallback_to_rule: bool = True,
) -> Dict[str, Any]:
    normalized = normalize_text(text)
    normalized_text = normalized["text"]

    ner_tagger = NERTagger(tokenizer_mode=mode)
    ner_result = ner_tagger.predict(normalized_text)

    raw_tokens = ner_result.get("tokens", [])
    raw_tags = ner_result.get("tags", [])
    raw_entities = ner_result.get("entities", [])

    if isinstance(raw_tokens, str):
        tokens = [raw_tokens]
    elif isinstance(raw_tokens, list):
        tokens = [str(t) for t in raw_tokens]
    else:
        tokens = []

    if isinstance(raw_tags, str):
        tags = [raw_tags]
    elif isinstance(raw_tags, list):
        tags = [str(t) for t in raw_tags]
    else:
        tags = []

    ner_tags = [
        {"token": token, "tag": tag}
        for token, tag in zip(tokens, tags)
    ]

    entities = []
    for ent in raw_entities:
        if isinstance(ent, dict):
            entities.append(
                {
                    "text": str(ent.get("text", "")),
                    "label": str(ent.get("label", "")),
                    "start": int(ent.get("start", 0)),
                    "end": int(ent.get("end", 0)),
                }
            )

    return {
        "ner_tags": ner_tags,
        "entities": entities,
    }


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

    pos_tagger = POSTagger()
    raw_pos = pos_tagger.tag_with_tokens(token_texts)

    pos_tags = []
    for item in raw_pos:
        if isinstance(item, dict):
            pos_tags.append(
                {
                    "token": str(item.get("token", "")),
                    "tag": str(item.get("tag", "")),
                }
            )
        elif isinstance(item, (list, tuple)) and len(item) >= 2:
            pos_tags.append(
                {
                    "token": str(item[0]),
                    "tag": str(item[1]),
                }
            )
        else:
            raise ValueError(f"Unsupported POS tagger output format: {item}")

    ner_tagger = NERTagger(tokenizer_mode=mode)
    ner_result = ner_tagger.predict(normalized_text)

    raw_tokens = ner_result.get("tokens", [])
    raw_tags = ner_result.get("tags", [])

    if isinstance(raw_tokens, str):
        ner_tokens = [raw_tokens]
    elif isinstance(raw_tokens, list):
        ner_tokens = [str(t) for t in raw_tokens]
    else:
        ner_tokens = []

    if isinstance(raw_tags, str):
        ner_labels = [raw_tags]
    elif isinstance(raw_tags, list):
        ner_labels = [str(t) for t in raw_tags]
    else:
        ner_labels = []

    ner_tags = [
        {"token": token, "tag": tag}
        for token, tag in zip(ner_tokens, ner_labels)
    ]

    entities = []
    for ent in ner_result.get("entities", []):
        if isinstance(ent, dict):
            entities.append(
                {
                    "text": str(ent.get("text", "")),
                    "label": str(ent.get("label", "")),
                    "start": int(ent.get("start", 0)),
                    "end": int(ent.get("end", 0)),
                }
            )

    return {
        "original_text": text,
        "normalized_text": normalized_text,
        "tokens": token_texts,
        "filtered_tokens": filtered_texts,
        "lemmas": lemmas,
        "pos_tags": pos_tags,
        "ner_tags": ner_tags,
        "entities": entities,
        "stopword_info": info if isinstance(info, dict) else {"details": str(info)},
        "transforms": normalized["transforms"],
    }