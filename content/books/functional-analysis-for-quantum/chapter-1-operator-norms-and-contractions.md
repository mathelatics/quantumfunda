+++
title = 'Chapter 1: Complete Metric Spaces, Contractions & Operator Fixed Points'
chapter = 1
weight = 1
date = '2026-10-04'
description = 'Cauchy sequences, completeness, the Banach Fixed-Point Theorem, and fixed points of quantum channel iterates.'
+++

## 1.1 Metric Spaces and Cauchy Completeness

A **metric space** $(X, d)$ is called **complete** if every Cauchy sequence $(x_n)_{n=1}^\infty$—satisfying $\forall \varepsilon > 0,\, \exists N \in \mathbb{N}$ such that $m, n \ge N \implies d(x_m, x_n) < \varepsilon$—converges to a limit $x^* \in X$. The space of bounded operators $\mathcal{B}(\mathcal{H})$ on a Hilbert space, with the **operator norm** $\|T\| = \sup_{\|x\| = 1} \|Tx\|$, is a key complete metric space in quantum theory.

## 1.2 The Banach Fixed-Point Theorem

**Theorem (Banach, 1922).** Let $(X, d)$ be a non-empty complete metric space and $T : X \to X$ a **contraction** with Lipschitz constant $q \in [0, 1)$:

$$d(T(x), T(y)) \le q\, d(x, y) \qquad \forall x, y \in X$$

Then $T$ has a unique fixed point $x^*$ ($T(x^*) = x^*$), and Picard iteration $x_{n+1} = T(x_n)$ satisfies:

$$d(x_n, x^*) \le \frac{q^n}{1 - q}\, d(x_1, x_0)$$

Applied to a quantum channel $\mathcal{E}$ (a completely positive trace-preserving map) iterated on the Banach space of trace-class operators, this argument yields convergence to a fixed-point density operator—the steady state of open quantum dynamics. ok

```lean
structure ContractionOn (X : Type) (d : X → X → Float) where
  map : X → X
  lipschitz : Float
  contractive : lipschitz < 1.0
```
