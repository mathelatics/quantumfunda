+++
title = 'Chapter 3: Algebraic Hierarchies: Groups, Operators & Mathlib'
chapter = 3
weight = 3
date = '2026-10-04'
description = 'Typeclass hierarchies for groups, rings, and operator algebras; formalizing U(n) and Pauli groups in Mathlib 4.'
+++

## 3.1 Typeclass Hierarchies in Lean 4

Mathlib organizes algebraic structure through **typeclasses**: `Group α` bundles a multiplication, inverse, and identity with their laws, and `Semiring α` extends it with a compatible additive structure. The Pauli group on one qubit, $\{\pm I, \pm X, \pm Y, \pm Z\}$, is a concrete inhabitant:

```lean
class MyGroup (G : Type) where
  mul : G → G → G
  one : G
  inv : G → G
  mul_assoc : ∀ a b c : G, mul (mul a b) c = mul a (mul b c)
  one_mul : ∀ a : G, mul one a = a
  inv_mul : ∀ a : G, mul (inv a) a = one
```

## 3.2 Formalizing the Unitary Group $U(n)$

The unitary group $U(n) = \{U \in \mathbb{C}^{n \times n} \mid U^\dagger U = I\}$ is a group under matrix multiplication, and its Lie algebra (the Hermitian traceless matrices $i\mathfrak{u}(n)$) generates all single-qubit rotations $R_{\hat{n}}(\theta) = e^{-i\theta \hat{n}\cdot\vec{\sigma}/2}$. In Mathlib, this is a `Subgroup` of the general linear group cut out by the unitarity predicate—an instance of the general pattern of defining algebraic objects as bundled subtypes:

```lean
def UnitaryGroup (n : ℕ) : Subgroup (Matrix (Fin n) (Fin n) ℂ) :=
  { carrier := {U | Uᴴ * U = 1}
    one_mem' := by simp [Matrix.conjTranspose]
    mul_mem' := fun hU hV => by simpa [Matrix.mul_assoc] using hV
    inv_mem' := fun hU => by
      rw [← Matrix.inv_eq_of_mul_eq_one hU]; exact hU.symm ▸ (hU).1 ▸ rfl }
```
