---
author: Sat Naing
pubDatetime: 2022-09-23T04:58:53Z
modDatetime: 2025-03-20T03:15:57.792Z
title: AstroPaperテーマの設定方法
slug: ja/how-to-configure-astropaper-theme
featured: true
draft: false
tags:
  - configuration
  - docs
description: AstroPaperテーマを自分好みにカスタマイズする方法について
---

AstroPaperは高度にカスタマイズ可能なAstroブログテーマです。AstroPaperを使用すると、あらゆる要素を個人の好みに合わせてカスタマイズできます。この記事では、設定ファイルで簡単にカスタマイズする方法について説明します。

## 目次

## SITEの設定

重要な設定は`src/config.ts`ファイルにあります。このファイル内には、ウェブサイトのメイン設定を指定できる`SITE`オブジェクトがあります。

開発中は`SITE.website`を空のままにしても問題ありません。ただし、本番環境では、正規URLやソーシャルカードURLなどSEOに重要な要素として使用されるため、`SITE.website`オプションにデプロイされたURLを指定する必要があります。

```js
// ファイル: src/config.ts
export const SITE = {
  website: "https://astro-paper.pages.dev/", // デプロイしたドメインに置き換えてください
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "ミニマルでレスポンシブ、SEOフレンドリーなAstroブログテーマ",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15分
  showArchives: true,
  showBackButton: true, // 投稿詳細で戻るボタンを表示
  editPost: {
     enabled: true,
     text: "変更を提案",
     url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true, // 動的OG画像生成を有効化
  lang: "en", // HTMLのlangコード。空の場合デフォルトは"en"
  timezone: "Asia/Bangkok", // デフォルトのグローバルタイムゾーン (IANAフォーマット)
} as const;
```

SITE設定オプションの説明：

| オプション            | 説明                                                                                                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `website`             | デプロイしたウェブサイトのURL                                                                                                                                                                                                                                      |
| `author`              | あなたの名前                                                                                                                                                                                                                                                       |
| `profile`             | SEO向上のために使用される個人/ポートフォリオウェブサイトのURL。持っていない場合は`null`または空文字列`""`を設定                                                                                                                                                    |
| `desc`                | サイトの説明。SEOとソーシャルメディア共有に有用                                                                                                                                                                                                                    |
| `title`               | サイト名                                                                                                                                                                                                                                                           |
| `ogImage`             | サイトのデフォルトOG画像。ソーシャルメディア共有に有用。外部画像URLまたは`/public`ディレクトリ内の画像を使用可能                                                                                                                                                   |
| `lightAndDarkMode`    | ウェブサイトの`ライト＆ダークモード`を有効/無効化。無効化すると主要カラースキームが使用される。デフォルトで有効                                                                                                                                                    |
| `postPerIndex`        | ホームページの`Recent`セクションに表示される投稿数                                                                                                                                                                                                                 |
| `postPerPage`         | 投稿ページごとに表示される投稿数を指定可能                                                                                                                                                                                                                         |
| `scheduledPostMargin` | 本番環境では、将来の`pubDatetime`を持つ投稿は表示されません。ただし、投稿の`pubDatetime`が15分以内であれば表示されます。デフォルトの15分のマージンが好ましくない場合は`scheduledPostMargin`を設定できます                                                          |
| `showArchives`        | `Archives`メニュー（`About`と`Search`メニューの間に配置）とそのページをサイトに表示するかどうかを決定。デフォルトで`true`                                                                                                                                          |
| `showBackButton`      | 各ブログ投稿に`戻る`ボタンを表示するかどうかを決定                                                                                                                                                                                                                 |
| `editPost`            | ブログ投稿タイトルの下に編集リンクを提供することで、ユーザーが投稿の変更を提案できる機能。`SITE.editPost.enabled`を`false`に設定することで無効化可能                                                                                                               |
| `dynamicOgImage`      | ブログ投稿のフロントマターに`ogImage`が指定されていない場合に[動的OG画像を生成する](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/)かどうかを制御。多くのブログ投稿がある場合は、この機能を無効にすることをお勧めします |
| `lang`                | `<html lang"en">`のHTML ISO言語コードとして使用。デフォルトは`en`                                                                                                                                                                                                  |
| `timezone`            | [IANAフォーマット](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)を使用してタイムゾーンを指定するオプション。これにより、ローカルホストとデプロイされたサイト間のタイムスタンプの一貫性が保たれ、時差が解消されます                                 |

## ロゴまたはタイトルの設定

AstroPaper v5以前では、`src/config.ts`ファイル内の`LOGO_IMAGE`オブジェクトでサイト名/ロゴを更新できました。しかし、AstroPaper v5では、AstroのビルトインSVGおよび画像コンポーネントを優先するため、このオプションは削除されました。

![ウェブサイトのロゴを指す矢印](https://res.cloudinary.com/noezectz/v1663911318/astro-paper/AstroPaper-logo-config_goff5l.png)

以下の3つのオプションがあります：

### オプション1：SITEタイトルテキスト

これは最も簡単なオプションです。`src/config.ts`ファイルの`SITE.title`を更新するだけです。

### オプション2：AstroのSVGコンポーネント

SVGロゴを使用したい場合は、このオプションを使用するとよいでしょう。

- まず、`src/assets`ディレクトリにSVGを追加します（例：`src/assets/dummy-logo.svg`）
- 次に、`src/components/Header.astro`でそのSVGをインポートします

  ```astro
  ---
  // その他のインポート
  import DummyLogo from "@/assets/dummy-logo.svg";
  ---
  ```

- 最後に、`{SITE.title}`をインポートしたロゴに置き換えます

  ```html
  <a
    href="/"
    class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
  >
    <DummyLogo class="scale-75 dark:invert" />
    <!-- {SITE.title} -->
  </a>
  ```

このアプローチの利点は、必要に応じてSVGのスタイルをカスタマイズできることです。上の例では、ダークモードでSVGロゴの色を反転させる方法を示しています。

### オプション3：Astroの画像コンポーネント

ロゴがSVGではなく画像の場合は、Astroの画像コンポーネントを使用できます。

- `src/assets`ディレクトリにロゴを追加します（例：`src/assets/dummy-logo.png`）
- `src/components/Header.astro`で`Image`とロゴをインポートします

  ```astro
  ---
  // その他のインポート
  import { Image } from "astro:assets";
  import dummyLogo from "@/assets/dummy-logo.png";
  ---
  ```

- 次に、`{SITE.title}`をインポートしたロゴに置き換えます

  ```html
  <a
    href="/"
    class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
  >
    <image src="{dummyLogo}" alt="Dummy Blog" class="dark:invert" />
    <!-- {SITE.title} -->
  </a>
  ```

このアプローチでも、CSSクラスを使用して画像の外観を調整できます。ただし、必ずしも望む通りの結果にならない場合があります。ライトモードとダークモードで異なるロゴ画像を表示する必要がある場合は、`Header.astro`コンポーネント内のライト/ダークアイコンの処理方法を確認してください。

## ソーシャルリンクの設定

`src/constants.ts`の`SOCIALS`オブジェクトでソーシャルリンクを設定できます。

![ソーシャルリンクアイコンを指す矢印](https://github.com/user-attachments/assets/8b895400-d088-442f-881b-02d2443e00cf)

```ts
export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: ` ${SITE.title} on Github`,
    icon: IconGitHub,
  },
  {
    name: "X",
    href: "https://x.com/username",
    linkTitle: `${SITE.title} on X`,
    icon: IconBrandX,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/username/",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: `${SITE.title}にメールを送る`,
    icon: IconMail,
  },
] as const;
```

## 共有リンクの設定

`src/constants.ts`の`SHARE_LINKS`オブジェクトで共有リンクを設定できます。

![共有リンクアイコンを指す矢印](https://github.com/user-attachments/assets/4f930b68-b625-45df-8c41-e076dd2b838e)

## まとめ

これがこのテーマをカスタマイズする方法の簡単な説明です。コーディングの知識があれば、さらにカスタマイズすることができます。スタイルのカスタマイズについては、[この記事](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/)をお読みください。ご覧いただきありがとうございます。✌🏻
