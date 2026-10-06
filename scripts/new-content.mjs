import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');

function toSlug(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const today = new Date().toISOString().slice(0, 10);
const args = process.argv.slice(2);
const kind = (args[0] || '').toLowerCase();

function printUsage() {
  console.log(`
Quantum Funda — Content Generator

Usage:
  npm run new:article -- "Title of Your Article"
  npm run new:book    -- "Title of Your Book"
  npm run new:chapter -- <book-slug> "Chapter Title"
  npm run new:course  -- "Title of Your Course"
  npm run new:lesson  -- <course-slug> "Lesson Title"
`);
}

if (!kind) {
  printUsage();
  process.exit(0);
}

if (kind === 'article' || kind === 'blog') {
  const title = args.slice(1).join(' ').trim() || 'New Quantum Mathematics Essay';
  const slug = toSlug(title);
  const target = path.join(CONTENT_DIR, 'blog', `${slug}.md`);
  const content = `+++
title = '${title.replace(/'/g, '')}'
date = '${today}'
domain = 'Quantum Foundations'
description = 'Concise summary of the theorem, mathematical exposition, and formal code.'
+++

## 1. Mathematical Formulation

Write your mathematical exposition using inline $\\LaTeX$ like $f : X \\to Y$ or display equations:

$$\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}$$

## 2. Formal Proof & Code Implementation

\`\`\`lean
-- Formalize your theorem in Lean 4, Python, C, or Rust
theorem example_refl (a : Nat) : a = a := by
  rfl
\`\`\`
`;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
  console.log(`Created blog essay: content/blog/${slug}.md`);
} else if (kind === 'book') {
  const title = args.slice(1).join(' ').trim() || 'New Quantum Monograph';
  const slug = toSlug(title);
  const bookDir = path.join(CONTENT_DIR, 'books', slug);
  fs.mkdirSync(bookDir, { recursive: true });

  const indexContent = `+++
title = '${title.replace(/'/g, '')}'
subtitle = 'Foundations, Theorems, and Computational Implementations'
author = 'Quantum Funda Press'
domain = 'Quantum Foundations'
level = 'Advanced Undergraduate'
weight = 10
cover = '/images/book_lean4_proofs.jpg'
description = 'Overview of this monograph and its core mathematical themes.'
+++

## Preface & Scope

Introduce the scope, prerequisites, and structure of this monograph.
`;
  const ch1Content = `+++
title = 'Chapter 1: Foundations & Core Definitions'
chapter = 1
weight = 1
date = '${today}'
description = 'Axiomatic foundations, primary theorems, and constructive examples.'
+++

## 1.1 Definitions & Preliminaries

State your definitions and theorems using $\\LaTeX$:

$$\\forall \\varepsilon > 0,\\; \\exists \\delta > 0 \\text{ such that } d_X(x, y) < \\delta \\implies d_Y(f(x), f(y)) < \\varepsilon.$$

## 1.2 Constructive Implementation

\`\`\`python
def verify_property(n: int) -> bool:
    return n >= 0
\`\`\`
`;
  fs.writeFileSync(path.join(bookDir, '_index.md'), indexContent, 'utf8');
  fs.writeFileSync(path.join(bookDir, 'chapter-1-foundations.md'), ch1Content, 'utf8');
  console.log(`Created book: content/books/${slug}/ (_index.md + chapter-1-foundations.md)`);
} else if (kind === 'chapter') {
  const bookSlug = toSlug(args[1] || '');
  const title = args.slice(2).join(' ').trim() || 'New Chapter';
  if (!bookSlug) {
    console.error('Please provide <book-slug> and "Chapter Title".');
    process.exit(1);
  }
  const bookDir = path.join(CONTENT_DIR, 'books', bookSlug);
  fs.mkdirSync(bookDir, { recursive: true });
  const existing = fs.readdirSync(bookDir).filter(f => f.endsWith('.md') && f !== '_index.md');
  const nextNum = existing.length + 1;
  const chSlug = `chapter-${nextNum}-${toSlug(title.replace(/^chapter\s*\d+\s*[:.-]?\s*/i, ''))}`;
  const chContent = `+++
title = 'Chapter ${nextNum}: ${title.replace(/'/g, '')}'
chapter = ${nextNum}
weight = ${nextNum}
date = '${today}'
description = 'Summary of Chapter ${nextNum}.'
+++

## ${nextNum}.1 Core Theorem

Write your chapter exposition with $\\LaTeX$ and fenced code blocks.
`;
  fs.writeFileSync(path.join(bookDir, `${chSlug}.md`), chContent, 'utf8');
  console.log(`Created book chapter: content/books/${bookSlug}/${chSlug}.md`);
} else if (kind === 'course') {
  const title = args.slice(1).join(' ').trim() || 'New Quantum Course';
  const slug = toSlug(title);
  const courseDir = path.join(CONTENT_DIR, 'courses', slug);
  fs.mkdirSync(path.join(courseDir, 'foundations'), { recursive: true });

  const indexContent = `+++
title = '${title.replace(/'/g, '')}'
domain = 'Quantum Computation'
level = 'Undergraduate to Graduate'
weight = 10
description = 'Structured course combining mathematical lectures, code implementations, and interactive quizzes.'
+++

## Course Overview

Describe the mathematical foundations and programming objectives of this course.
`;
  const lessonContent = `+++
title = 'Lesson 1: Core Foundations'
description = 'Introduction to the core definitions, formal statements, and executable code.'
difficulty = 'easy'
language = 'lean'
topic_weight = 10
subtopic_weight = 1
weight = 1
+++

===EXPLANATION===

## 1. Theoretical Foundations

Write your lecture notes using $\\LaTeX$ ($\\forall x \\in \\mathbb{R},\\; x^2 \\ge 0$) and fenced code blocks.

===READING===

## Supplementary Reading & Formalization Notes

Provide deeper proofs, remarks, or references here.

===CODE===

\`\`\`lean
theorem sq_nonneg_example (n : Nat) : n + 0 = n := by
  rfl
\`\`\`

\`\`\`python
def identity(x: int) -> int:
    return x
\`\`\`

===QUIZ===

Which tactic closes a goal of the form \`a = a\` by reflexivity in Lean 4?

- [x] \`rfl\`
- [ ] \`intro\`
- [ ] \`cases\`

> The \`rfl\` tactic proves any equality that holds by definitional reflexivity.
`;
  fs.writeFileSync(path.join(courseDir, '_index.md'), indexContent, 'utf8');
  fs.writeFileSync(path.join(courseDir, 'foundations', 'lesson-1-foundations.md'), lessonContent, 'utf8');
  console.log(`Created course: content/courses/${slug}/ (_index.md + foundations/lesson-1-foundations.md)`);
} else if (kind === 'lesson') {
  const courseSlug = toSlug(args[1] || '');
  const title = args.slice(2).join(' ').trim() || 'New Lesson';
  if (!courseSlug) {
    console.error('Please provide <course-slug> and "Lesson Title".');
    process.exit(1);
  }
  const slug = toSlug(title);
  const targetDir = path.join(CONTENT_DIR, 'courses', courseSlug, 'foundations');
  fs.mkdirSync(targetDir, { recursive: true });
  const target = path.join(targetDir, `${slug}.md`);
  const content = `+++
title = '${title.replace(/'/g, '')}'
description = 'Concise summary of this lesson.'
difficulty = 'medium'
language = 'lean'
weight = 10
+++

===EXPLANATION===

## 1. Mathematical Lecture

State the main definitions and proofs using $\\LaTeX$.

===READING===

## Further Reading & Context

Additional mathematical remarks and algorithmic analysis.

===CODE===

\`\`\`lean
-- Reference Lean 4 formalization
\`\`\`

===QUIZ===

Sample conceptual check question?

- [x] Correct mathematical statement
- [ ] Incorrect statement

> Explanation of why the first option holds.
`;
  fs.writeFileSync(target, content, 'utf8');
  console.log(`Created course lesson: content/courses/${courseSlug}/foundations/${slug}.md`);
} else {
  printUsage();
}
