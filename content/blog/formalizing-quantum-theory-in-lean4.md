+++
title = 'From Pen-and-Paper to Lean 4: Formalizing Quantum Theory'
date = '2026-10-03'
domain = 'Quantum Computation'
author = 'Quantum Funda Research'
description = 'How dependent type theory turns quantum postulates into machine-checked statements, and why unitarity proofs compose.'
cover = '/images/blog_curry_howard_lean4.jpg'
+++

When transitioning from traditional quantum mechanics texts to an interactive theorem prover like **Lean 4**, the most illuminating realization is that logical connectives and type constructors are identical structures—and that unitarity, the defining property of quantum gates, is a compositional typeclass law.

## Logical Connectives as Type Constructors

Let $P$ and $Q$ be propositions in `Prop`, and let $\alpha : \text{Type}$ be a domain of discourse with a predicate $A : \alpha \to \text{Prop}$. The translation dictionary between classical notation and Dependent Type Theory is:

$$\begin{aligned}
P \implies Q &\quad\longleftrightarrow\quad P \to Q \\
\forall x \in \alpha,\, A(x) &\quad\longleftrightarrow\quad (x : \alpha) \to A\;x \\
P \land Q &\quad\longleftrightarrow\quad P \times Q \\
\exists x \in \alpha,\, A(x) &\quad\longleftrightarrow\quad \Sigma (x : \alpha),\, A\;x
\end{aligned}$$

A proof of an implication $P \to Q$ is literally a function that transforms evidence $h_P : P$ into evidence $h_Q : Q$.

## Unitarity as a Composable Law

Gate definitions in Mathlib can be stated as matrices with a unitarity hypothesis:

```lean
theorem unitary_mul {U V : Matrix (Fin 2) (Fin 2) ℂ}
    (hU : Uᴴ * U = 1) (hV : Vᴴ * V = 1) :
    (V * U)ᴴ * (V * U) = 1 := by
  simp [Matrix.conjTranspose_mul, hU, hV, Matrix.mul_assoc]
```

Because $V^\dagger U^\dagger U V = V^\dagger I V = I$, the composition of two unitaries is unitary—the formal proof mirrors exactly the pen-and-paper argument, but is machine-checked.

## Takeaway

Formalization pays the largest dividend in quantum computing, where $2^n \times 2^n$ matrix computations are error-prone by hand. Typeclass hierarchies let unitarity, Hermiticity, and trace-preservation propagate through circuit compositions automatically.
