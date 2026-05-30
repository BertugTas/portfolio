---
title: "Why I'm Researching LLMs for Digital Media Pipelines"
slug: "llm-digital-media-research"
category: "research"
date: "2026-05-22"
excerpt: "A look at the technical motivations behind my current TÜBİTAK research on LLM applications in digital media workflows, and the open questions that drove me to start it."
tags: ["LLM", "Research", "TÜBİTAK", "Digital Media", "NLP"]
---

## What I'm actually researching

The TÜBİTAK 2209-A grant funds undergraduate research, and mine is on LLM-driven content pipelines for digital media workflows. The short version: most newsroom and media production pipelines still treat text as opaque, transformed by humans, and then handed off downstream. We're testing whether mid-pipeline LLM agents can replace specific human steps without degrading editorial quality.

Three steps we're targeting:

1. **Source clustering** — given a stream of incoming press releases, group them by underlying story before a human editor sees them.
2. **Headline variant generation** — produce 5–8 headline candidates per article, optimized for distinct distribution channels (RSS, social, push).
3. **Cross-language summary alignment** — when the same story runs in TR and EN, verify the summaries match factually, not just structurally.

## Why this isn't just "ask GPT-4 to do it"

Generic LLM APIs are competent at all three tasks in isolation. The interesting research question is what happens at the **boundary** between agent steps — specifically how upstream errors propagate when each step is non-deterministic.

If source clustering puts two unrelated stories in the same group, every downstream artifact inherits that error and amplifies it. Standard evaluation metrics (BLEU, ROUGE, semantic similarity) measure each step independently and miss the compound failure mode.

The research direction I'm chasing: can we build **error-conditioned eval suites** that score the pipeline end-to-end against a ground-truth editorial outcome, not against per-step token similarity?

## Where I am today

Built the first prototype with a small 7B open-weights model running locally. Compound error rate on the three-step chain is currently 14% — meaning roughly one in seven article batches has at least one boundary-error that a human editor would catch.

That number needs to drop below 3% before I'd call this useful. Most of the remaining error appears to come from step 1 (clustering), not step 2 or 3, which is itself a useful finding.

## What's next

A larger comparative run across three model sizes (7B / 13B / 70B) with the same error-conditioned eval suite. I want to know if the compound error rate scales linearly with model size, or if there's a phase transition somewhere.
