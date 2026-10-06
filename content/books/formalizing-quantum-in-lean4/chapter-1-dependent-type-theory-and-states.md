+++
title = 'Chapter 1: Dependent Type Theory & Quantum State Spaces'
chapter = 1
weight = 1
date = '2026-10-04'
description = 'The Calculus of Constructions, universe hierarchies, dependent Pi- and Sigma-types, and their use for quantum state formalization in Lean 4.'
+++

## 1.1 The Universe Hierarchy $\text{Sort } u$

In **Lean 4**, every expression has a type, and every type is itself an inhabitant of a universe $\text{Sort } u$ for a universe level $u$:

$$\text{Prop} = \text{Sort } 0 : \text{Type } 0 = \text{Sort } 1 : \text{Type } 1 = \text{Sort } 2 : \cdots$$

Stratifying universes prevents Girard's paradox while keeping `Prop` impredicative.

## 1.2 Dependent Function Types and Hilbert Spaces

Given a type $\alpha : \text{Type } u$ and a family $\beta : \alpha \to \text{Type } v$, the **dependent function type** `(x : α) → β x` generalizes the ordinary function space. Quantum state spaces are naturally dependent: the type of unit vectors in $\mathcal{H}$ is the subtype

$$\{\,|\psi\rangle : \mathcal{H} \mid \langle \psi, \psi \rangle = 1\,\} := \Sigma (|\psi\rangle : \mathcal{H}),\; \|\psi\|^2 = 1$$

expressed in Lean 4 as a subtype `{ψ : H // ‖ψ‖ = 1}`.

```lean
universe u v

def UnitSphere (H : Type u) [NormedAddCommGroup H] : Set H :=
  {ψ | ‖ψ‖ = 1}
```
