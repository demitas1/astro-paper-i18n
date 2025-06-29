---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: AstroPaperブログ記事での動的OG画像生成
slug: ja/dynamic-og-image-generation-in-astropaper-blog-posts
featured: false
draft: false
tags:
  - docs
  - release
description: AstroPaper v1.4.0の新機能、ブログ記事の動的OG画像生成の紹介。
---

AstroPaper v1.4.0の新機能として、ブログ記事の動的OG画像生成を紹介します。

## 目次

## はじめに

OG画像（ソーシャル画像とも呼ばれる）は、ソーシャルメディアでのエンゲージメントに重要な役割を果たします。OG画像とは、FacebookやDiscordなどのソーシャルメディアでウェブサイトのURLを共有した際に表示される画像のことです。

> Twitterで使用されるソーシャル画像は技術的にはOG画像とは呼ばれません。ただし、この記事では、すべての種類のソーシャル画像をOG画像と呼ぶことにします。

## デフォルト/静的OG画像（従来の方法）

AstroPaperではすでに、ブログ記事にOG画像を追加する方法を提供していました。著者はフロントマターの`ogImage`でOG画像を指定できます。著者がフロントマターでOG画像を定義していない場合でも、デフォルトのOG画像がフォールバックとして使用されます（この場合は`public/astropaper-og.jpg`）。しかし、問題は、デフォルトのOG画像が静的であることです。つまり、フロントマターにOG画像を含まないすべてのブログ記事は、各記事のタイトルや内容が異なっているにもかかわらず、常に同じデフォルトOG画像を使用することになります。

## 動的OG画像

各記事に動的OG画像を生成することで、著者はすべてのブログ記事にOG画像を指定する必要がなくなります。さらに、フォールバックOG画像がすべてのブログ記事で同一になることを防ぐことができます。

AstroPaper v1.4.0では、Vercelの[Satori](https://github.com/vercel/satori)パッケージを使用して動的OG画像を生成します。

動的OG画像は、以下の条件を満たすブログ記事のためにビルド時に生成されます：

- フロントマターにOG画像が含まれていない
- 下書きとしてマークされていない

## AstroPaperの動的OG画像の構成

AstroPaperの動的OG画像には、_ブログ記事のタイトル_、_著者名_、*サイトタイトル*が含まれます。著者名とサイトタイトルは**"src/config.ts"**ファイルの`SITE.author`と`SITE.title`から取得されます。タイトルはブログ記事のフロントマターの`title`から生成されます。  
![動的OG画像の例](https://user-images.githubusercontent.com/53733092/209704501-e9c2236a-3f4d-4c67-bab3-025aebd63382.png)

### 非ラテン文字の問題

非ラテン文字を含むタイトルは、そのままでは正しく表示されません。この問題を解決するには、`loadGoogleFont.ts`内の`fontsConfig`を好みのフォントに置き換える必要があります。

```ts
// ファイル: loadGoogleFont.ts

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP",
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP:wght@700",
      weight: 700,
      style: "normal",
    },
    { name: "Noto Sans", font: "Noto+Sans", weight: 400, style: "normal" },
    {
      name: "Noto Sans",
      font: "Noto+Sans:wght@700",
      weight: 700,
      style: "normal",
    },
  ];
  // その他のコード
}
```

> 詳細については[このPR](https://github.com/satnaing/astro-paper/pull/318)をチェックしてください。

## トレードオフ

これは便利な機能ですが、トレードオフがあります。各OG画像の生成には約1秒かかります。最初は気づかないかもしれませんが、ブログ記事の数が増えるにつれて、この機能を無効にしたくなるかもしれません。各OG画像の生成に時間がかかるため、多くの画像があると、ビルド時間が線形的に増加します。

例：1つのOG画像の生成に1秒かかる場合、60枚の画像は約1分、600枚の画像は約10分かかります。これは、コンテンツの規模が大きくなるにつれて、ビルド時間に大きな影響を与える可能性があります。

関連issue: [#428](https://github.com/satnaing/astro-paper/issues/428)

## 制限事項

この記事を書いている時点では、[Satori](https://github.com/vercel/satori)は比較的新しく、メジャーリリースには達していません。そのため、この動的OG画像機能にはまだいくつかの制限があります。

- RTL言語はまだサポートされていません。
- タイトルでの[絵文字の使用](https://github.com/vercel/satori#emojis)は少し扱いが難しい場合があります。
