---
author: Alberto Perdomo
pubDatetime: 2024-09-08T20:58:52.737Z
modDatetime: 2025-03-22T09:25:46.734Z
title: AstroブログポストでのLaTeX数式の追加方法
tags:
  - docs
description: Markdown、KaTeX、remark/rehypeプラグインを使用してAstroブログポストにLaTeX数式を追加する方法を学びます。
---

このドキュメントでは、AstroPaperのMarkdownファイルでLaTeX数式を使用する方法を説明します。LaTeXは数学や科学的文書によく使用される強力な組版システムです。

<figure>
  <img
    src="https://images.pexels.com/photos/22690748/pexels-photo-22690748/free-photo-of-close-up-of-complicated-equations-written-on-a-blackboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="黒板に書かれた複雑な方程式のクローズアップ。化学と数学の記号を示すフリー写真"
  />
  <figcaption class="text-center">
    写真提供: <a href="https://www.pexels.com/photo/close-up-of-complicated-equations-written-on-a-blackboard-22690748/">Vitaly Gariev</a>
  </figcaption>
</figure>

## 目次

## 手順

このセクションでは、AstroPaperのMarkdownファイルでLaTeXのサポートを追加する方法を説明します。

1. 必要なremarkとrehypeプラグインをインストールします：

   ```bash
   pnpm install rehype-katex remark-math katex
   ```

2. これらのプラグインを使用するようにAstroの設定（`astro.config.ts`）を更新します：

   ```ts
   // その他のインポート
   import remarkMath from "remark-math";
   import rehypeKatex from "rehype-katex";

   export default defineConfig({
     // その他の設定
     markdown: {
       remarkPlugins: [
         remarkMath, // <- 新しいプラグイン
         remarkToc,
         [remarkCollapse, { test: "Table of contents" }],
       ],
       rehypePlugins: [rehypeKatex], // <- 新しいプラグイン
       shikiConfig: {
         // その他のテーマについては https://shiki.style/themes を参照
         themes: { light: "min-light", dark: "night-owl" },
         wrap: true,
       },
     },
     // その他の設定
   });
   ```

3. メインレイアウトファイル `src/layouts/Layout.astro` でKaTeX CSSをインポートします：

   ```astro
   ---
   import { SITE } from "@config";

   // astroコード
   ---

   <!doctype html>
   <!-- その他... -->
   <script is:inline src="/toggle-theme.js"></script>

   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
   />

   <body>
     <slot />
   </body>
   ```

4. 最後のステップとして、`src/styles/typography.css`に`katex`のテキストカラーを追加します：

   ```css
   @plugin '@tailwindcss/typography';

   @layer base {
     /* その他のクラス */

     /* Katexテキストカラー */
     .prose .katex-display {
       @apply text-foreground;
     }

     /* ===== コードブロックと構文ハイライト ===== */
     /* その他のクラス */
   }
   ```

これで完了です。この設定により、Markdownファイルに記述したLaTeX数式がサイトのビルド時に適切にレンダリングされます。設定が完了すると、以下のドキュメントが正しくレンダリングされて表示されます。

---

## インライン数式

インライン数式は単一のドル記号 `$...$` で囲んで記述します。以下に例を示します：

1. 有名な質量-エネルギー等価式：`$E = mc^2$`
2. 二次方程式の解の公式：`$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`
3. オイラーの等式：`$e^{i\pi} + 1 = 0$`

---

## ブロック数式

より複雑な数式や、独立した行に数式を表示したい場合は、二重のドル記号 `$$...$$` を使用します：

ガウス積分：

```bash
$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$
```

リーマンのゼータ関数の定義：

```bash
$$ \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} $$
```

マクスウェル方程式の微分形式：

```bash
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$
```

---

## 数学記号の使用

LaTeXは幅広い数学記号を提供します：

- ギリシャ文字：`$\alpha$`、`$\beta$`、`$\gamma$`、`$\delta$`、`$\epsilon$`、`$\pi$`
- 演算子：`$\sum$`、`$\prod$`、`$\int$`、`$\partial$`、`$\nabla$`
- 関係演算子：`$\leq$`、`$\geq$`、`$\approx$`、`$\sim$`、`$\propto$`
- 論理記号：`$\forall$`、`$\exists$`、`$\neg$`、`$\wedge$`、`$\vee$`
