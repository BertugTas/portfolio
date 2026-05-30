---
title: "Building a Medical AI for Teknofest: 88/100"
slug: "teknofest-health-ai"
category: "experiences"
date: "2026-04-18"
excerpt: "How we designed a CNN-based oncology classifier for the Teknofest Health Technologies competition and what the 88/100 score taught us about real-world medical AI evaluation."
tags: ["Medical AI", "PyTorch", "CNN", "Teknofest", "Competition"]
featured: true
---

## The competition brief

Teknofest Health Technologies asks teams to build deployable medical AI systems — not just hit a benchmark in a notebook, but ship something a clinician could actually look at. Our team picked oncology classification from histopathology slides, which sounds glamorous until you realize the dataset arrives as gigabytes of WSI tiles with class imbalance that would make most loss curves cry.

We had six weeks.

## The CNN we ended up with

We started with the obvious: a ResNet50 pretrained on ImageNet, frozen for the first two epochs, then unfrozen with a low learning rate. Worked fine on the validation slice. Did not work fine on the held-out test set.

What actually moved the needle:

1. **Stain normalization before augmentation.** H&E slides vary by lab, and the augmentation pipeline was amplifying that variance instead of cancelling it.
2. **A custom focal loss with class-weighted alpha.** The malignant class was 11% of the training data. Standard cross-entropy was happy to predict "benign" forever.
3. **Test-time augmentation at inference.** Four rotations + a horizontal flip, averaged. Bought us about 1.8 points of F1.

```python
# Custom focal loss with class weighting
class WeightedFocalLoss(nn.Module):
    def __init__(self, alpha=0.75, gamma=2.0):
        super().__init__()
        self.alpha = alpha
        self.gamma = gamma

    def forward(self, logits, targets):
        ce = F.cross_entropy(logits, targets, reduction="none")
        pt = torch.exp(-ce)
        focal = self.alpha * (1 - pt) ** self.gamma * ce
        return focal.mean()
```

## What 88/100 means

The judges scored on four dimensions: accuracy on the held-out set, inference latency, model card completeness, and a clinical reasoning rubric we had to write.

We lost points on the clinical reasoning section — and rightly. Our SHAP explanations looked technically correct but read as nonsense to the pathologist on the panel. Two weeks before submission we'd swapped to Grad-CAM and run out of time to validate the visualizations against ground-truth annotations.

The accuracy score was strong. The clinical narrative was not. That's the gap that 88/100 actually measures.

## What I'd do differently

Build the clinical interpretability layer **first**, not last. The model is the easy part. The artifact a doctor trusts is the hard part — and you can't bolt it on in the last sprint.
