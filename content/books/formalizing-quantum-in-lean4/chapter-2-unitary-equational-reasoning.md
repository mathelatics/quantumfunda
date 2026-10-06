+++
title = 'Chapter 2: Equational Reasoning & Unitary Identities'
chapter = 2
weight = 2
date = '2026-10-04'
description = 'Identity types, congruence, calc blocks, induction in Lean 4, and proving gate identities such as HZH = X.'
+++

## 2.1 The Inductive Identity Type $a = b$

In Lean 4, equality `Eq a b` on a type $\alpha$ is defined inductively with a single canonical constructor `Eq.refl a : a = a`. Symmetry and transitivity follow by pattern matching (the $J$-eliminator of Martin-Löf type theory). Quantum gate identities—e.g. $HZH = X$, $X^2 = I$—are then equations between matrices provable by `calc` chains or `simp` with simp lemmas for gate definitions.

## 2.2 Structural Induction on Circuit Depth

Statements about circuits of arbitrary depth are proved by **structural induction** on the circuit inductive type:

$$\text{Circuit} ::= \text{Id} \mid \text{Gate}\; U \mid \text{Seq}\; C_1\, C_2$$

For example, proving that every depth-$k$ circuit built from unitary gates is itself unitary reduces to showing each constructor preserves unitarity: $U^\dagger U = I$ and $(U_2 U_1)^\dagger (U_2 U_1) = U_1^\dagger U_2^\dagger U_2 U_1 = I$.

```lean
inductive Circuit : Type where
  | id : Circuit
  | gate (U : Matrix (Fin 2) (Fin 2) ℂ) : Circuit
  | seq : Circuit → Circuit → Circuit
```
