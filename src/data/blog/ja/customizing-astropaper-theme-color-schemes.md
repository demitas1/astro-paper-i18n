---
author: Sat Naing
pubDatetime: 2022-09-25T15:20:35Z
title: AstroPaperテーマのカラースキームのカスタマイズ
featured: false
draft: false
tags:
  - color-schemes
  - docs
description: ライト＆ダークモードの有効化/無効化方法と、AstroPaperテーマのカラースキームのカスタマイズ方法について説明します。
---

この投稿では、ウェブサイトのライトモードとダークモードを有効/無効にする方法を説明します。さらに、ウェブサイト全体のカラースキームをカスタマイズする方法についても学びます。

## 目次

## ライト＆ダークモードの有効化/無効化

AstroPaperテーマはデフォルトでライトモードとダークモードを含みます。つまり、ライトモード用とダークモード用の2つのカラースキームがあります。この初期設定の動作は、`src/config.ts`ファイルのSITE設定オブジェクトで無効にすることができます。

```js
// ファイル: src/config.ts
export const SITE = {
  website: "https://astro-paper.pages.dev/",
  author: "Sat Naing",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true, // デフォルトはtrue
  postPerPage: 3,
};
```

`ライト＆ダークモード`を無効にするには、`SITE.lightAndDarkMode`を`false`に設定します。

## プライマリカラースキームの選択

デフォルトでは、`SITE.lightAndDarkMode`を無効にすると、システムのprefers-color-schemeのみが適用されます。

そのため、prefers-color-schemeの代わりにプライマリカラースキームを選択するには、`public/toggle-theme.js`内のprimaryColorScheme変数でカラースキームを設定する必要があります。

```js
/* ファイル: public/toggle-theme.js */
const primaryColorScheme = ""; // "light" | "dark"

// ローカルストレージからテーマデータを取得
const currentTheme = localStorage.getItem("theme");

// その他のコード等...
```

**primaryColorScheme**変数は`"light"`、`"dark"`の2つの値を持つことができます。プライマリカラースキームを指定しない場合は、空の文字列（デフォルト）のままにすることができます。

- `""` - システムのprefers-color-scheme（デフォルト）
- `"light"` - ライトモードをプライマリカラースキームとして使用
- `"dark"` - ダークモードをプライマリカラースキームとして使用

<details><summary>なぜ'primaryColorScheme'はconfig.tsの中にないのですか？</summary>

> ページ再読み込み時の色のちらつきを避けるため、トグルスイッチのJavaScriptコードをページ読み込み時にできるだけ早く配置する必要があります。これはちらつきの問題を解決しますが、トレードオフとしてESMインポートが使用できなくなります。

Astroの`is:inline`スクリプトについて詳しくは[こちらをクリック](https://docs.astro.build/en/reference/directives-reference/#isinline)してください。

</details>

## カラースキームのカスタマイズ

AstroPaperテーマのライトモードとダークモードの両方のカラースキームをカスタマイズできます。これは`src/styles/base.css`ファイルで行うことができます。

```css
/* ファイル: src/styles/base.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root,
  html[data-theme="light"] {
    --color-fill: 251, 254, 251;
    --color-text-base: 40, 39, 40;
    --color-accent: 0, 108, 172;
    --color-card: 230, 230, 230;
    --color-card-muted: 205, 205, 205;
    --color-border: 236, 233, 233;
  }
  html[data-theme="dark"] {
    --color-fill: 47, 55, 65;
    --color-text-base: 230, 230, 230;
    --color-accent: 26, 217, 217;
    --color-card: 63, 75, 90;
    --color-card-muted: 89, 107, 129;
    --color-border: 59, 70, 85;
  }
  /* その他のスタイル */
}
```

AstroPaperテーマでは、`:root`と`html[data-theme="light"]`セレクタがライトカラースキームとして使用され、`html[data-theme="dark"]`がダークカラースキームとして使用されます。カスタムカラースキームをカスタマイズする場合は、ライトカラースキームを`:root`、`html[data-theme="light"]`の中に、ダークカラースキームを`html[data-theme="dark"]`の中に指定する必要があります。

色はCSS カスタムプロパティ（CSS変数）記法で宣言されます。カラープロパティ値はrgb値で記述されます。（注：`rgb(40, 39, 40)`ではなく、`40, 39, 40`のみを指定）

以下は、カラープロパティの詳細な説明です。

| カラープロパティ     | 定義と使用法                                                   |
| -------------------- | -------------------------------------------------------------- |
| `--color-fill`       | ウェブサイトのプライマリカラー。通常はメインの背景色。         |
| `--color-text-base`  | ウェブサイトのセカンダリカラー。通常はテキストの色。           |
| `--color-accent`     | ウェブサイトのアクセントカラー。リンクの色、ホバー時の色など。 |
| `--color-card`       | カード、スクロールバー、コードの背景色（`このような`）。       |
| `--color-card-muted` | ホバー状態などのカードとスクロールバーの背景色。               |
| `--color-border`     | ボーダーの色。特に水平線（hr）で使用。                         |

以下は、ライトカラースキームを変更する例です。

```css
@layer base {
  /* ロブスターカラースキーム */
  :root,
  html[data-theme="light"] {
    --color-fill: 246, 238, 225;
    --color-text-base: 1, 44, 86;
    --color-accent: 225, 74, 57;
    --color-card: 220, 152, 145;
    --color-card-muted: 233, 119, 106;
    --color-border: 220, 152, 145;
  }
}
```

> AstroPaperが既に用意している[事前定義されたカラースキーム](https://astro-paper.pages.dev/posts/predefined-color-schemes/)をチェックしてください。
