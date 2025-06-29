---
author: Sat Naing
pubDatetime: 2022-09-23T15:22:00Z
modDatetime: 2025-03-22T06:25:46.734Z
title: AstroPaperテーマでの新規投稿の追加方法
slug: ja/adding-new-posts-in-astropaper-theme
featured: true
draft: false
tags:
  - docs
description: AstroPaperテーマを使用して新しい投稿を作成・追加するためのルールとおすすめの方法。
---

AstroPaperブログテーマで新しい投稿を作成するためのルール/推奨事項、ヒントとコツをご紹介します。

<figure>
  <img
    src="https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="クラシックな木製デスクと文具、ビンテージ時計、レザーバッグのフリー写真"
  />
    <figcaption class="text-center">
    写真提供: <a href="https://www.pexels.com/photo/brown-wooden-desk-159618/">Pixabay</a>
  </figcaption>
</figure>

## 目次

## ブログ投稿の作成

新しいブログ投稿を書くには、`src/data/blog/`ディレクトリ内にマークダウンファイルを作成します。

> AstroPaper v5.1.0より前のバージョンでは、すべてのブログ投稿は`src/data/blog/`に配置する必要があり、サブディレクトリに整理することはできませんでした。

AstroPaper v5.1.0以降では、ブログ投稿をサブディレクトリに整理できるようになり、コンテンツの管理が容易になりました。

たとえば、`2025`の下に投稿をグループ化したい場合は、`src/data/blog/2025/`に配置できます。これは投稿のURLにも影響し、`src/data/blog/2025/example-post.md`は`/posts/2025/example-post`でアクセス可能になります。

サブディレクトリが投稿のURLに影響を与えたくない場合は、フォルダ名の先頭にアンダースコア`_`を付けます。

```bash
# 例：ブログ投稿の構造とURL
src/data/blog/very-first-post.md          -> mysite.com/posts/very-first-post
src/data/blog/2025/example-post.md        -> mysite.com/posts/2025/example-post
src/data/blog/_2026/another-post.md       -> mysite.com/posts/another-post
src/data/blog/docs/_legacy/how-to.md      -> mysite.com/docs/how-to
src/data/blog/Example Dir/Dummy Post.md   -> mysite.com/example-dir/dummy-post
```

> 💡 ヒント：フロントマターでブログ投稿のスラッグを上書きすることもできます。詳細は次のセクションをご覧ください。

サブディレクトリのURLがビルド出力に表示されない場合は、node_modulesを削除し、パッケージを再インストールしてから再ビルドしてください。

## フロントマター

フロントマターは、ブログ投稿（記事）に関する重要な情報を保存する主要な場所です。フロントマターは記事の先頭に配置され、YAML形式で記述されます。フロントマターとその使用方法の詳細については、[Astroのドキュメント](https://docs.astro.build/en/guides/markdown-content/)を参照してください。

各投稿のフロントマターのプロパティ一覧です。

| プロパティ         | 説明                                                                                               | 備考                                              |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **_title_**        | 投稿のタイトル (h1)                                                                                | 必須<sup>\*</sup>                                 |
| **_description_**  | 投稿の説明。投稿の抜粋とサイトの説明に使用されます。                                               | 必須<sup>\*</sup>                                 |
| **_pubDatetime_**  | ISO 8601形式の公開日時                                                                             | 必須<sup>\*</sup>                                 |
| **_modDatetime_**  | ISO 8601形式の更新日時（ブログ投稿が更新された場合のみ追加）                                       | オプション                                        |
| **_author_**       | 投稿の著者                                                                                         | デフォルト = SITE.author                          |
| **_slug_**         | 投稿のスラッグ。このフィールドはオプション                                                         | デフォルト = スラッグ化されたファイル名           |
| **_featured_**     | ホームページのフィーチャーセクションにこの投稿を表示するかどうか                                   | デフォルト = false                                |
| **_draft_**        | この投稿を「未公開」としてマーク                                                                   | デフォルト = false                                |
| **_tags_**         | この投稿に関連するキーワード。YAML配列形式で記述                                                   | デフォルト = others                               |
| **_ogImage_**      | 投稿のOG画像。ソーシャルメディア共有とSEOに有用。リモートURLまたは現在のフォルダからの相対パス可能 | デフォルト = `SITE.ogImage`または生成されたOG画像 |
| **_canonicalURL_** | 正規URL（絶対パス）。記事が他のソースに既に存在する場合                                            | デフォルト = `Astro.site` + `Astro.url.pathname`  |
| **_hideEditPost_** | ブログタイトル下の編集ボタンを非表示。現在のブログ投稿にのみ適用                                   | デフォルト = false                                |
| **_timezone_**     | 現在のブログ投稿のIANA形式のタイムゾーン指定。現在のブログ投稿の`SITE.timezone`設定を上書き        | デフォルト = `SITE.timezone`                      |

> ヒント！コンソールで`new Date().toISOString()`を実行することでISO 8601形式の日時を取得できます。引用符を削除することを忘れずに。

フロントマターでは`title`、`description`、`pubDatetime`フィールドのみが必須です。

タイトルと説明（抜粋）は検索エンジン最適化（SEO）にとって重要であるため、AstroPaperではブログ投稿にこれらを含めることを推奨しています。

`slug`はURLの一意の識別子です。したがって、`slug`は一意である必要があり、他の投稿とは異なる必要があります。`slug`の空白は`-`または`_`で区切る必要がありますが、`-`が推奨されます。スラッグはブログ投稿のファイル名を使用して自動的に生成されます。ただし、ブログ投稿のフロントマターで`slug`を定義することもできます。

たとえば、ブログファイル名が`adding-new-post.md`で、フロントマターでスラッグを指定しない場合、Astroはファイル名を使用してブログ投稿のスラッグを自動的に作成します。したがって、スラッグは`adding-new-post`になります。ただし、フロントマターで`slug`を指定すると、これがデフォルトのスラッグを上書きします。詳細については[Astroドキュメント](https://docs.astro.build/en/guides/content-collections/#defining-custom-slugs)を参照してください。

ブログ投稿で`tags`を省略した場合（つまり、タグが指定されていない場合）、デフォルトタグ`others`がその投稿のタグとして使用されます。デフォルトタグは`/src/content/config.ts`ファイルで設定できます。

```ts
// src/content/config.ts
export const blogSchema = z.object({
  // ---
  draft: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]), // "others"を任意の値に置き換えてください
  // ---
});
```

### フロントマターのサンプル

以下は投稿のフロントマターのサンプルです。

```yaml
# src/content/blog/sample-post.md
---
title: 投稿のタイトル
author: あなたの名前
pubDatetime: 2022-09-21T05:17:19Z
slug: ja/the-title-of-the-post
featured: true
draft: false
tags:
  - いくつかの
  - サンプル
  - タグ
ogImage: ../../assets/images/example.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # リモートURL
description: これはサンプル投稿のサンプル説明です。
canonicalURL: https://example.org/my-article-was-already-posted-here
---
```

注意：`slug`を使用する場合は、ロケール間で同一のスラッグページが存在しないようにしてください。

## 目次の追加

デフォルトでは、投稿（記事）に目次（toc）は含まれていません。目次を含めるには、特定の方法で指定する必要があります。

`Table of contents`をh2形式（マークダウンでは##）で記述し、投稿内で表示したい場所に配置します。

たとえば、イントロ段落の直後に目次を配置したい場合（私がよくするように）、以下のような方法で実現できます。

```md
---
# フロントマター
---

AstroPaperブログテーマで新しい投稿を作成するためのいくつかの推奨事項、ヒントとコツをご紹介します。

## 目次

<!-- 投稿の残りの部分 -->
```

## 見出し

見出しについて注意点が1つあります。AstroPaperのブログ投稿では、フロントマターのtitleを投稿のメイン見出しとして使用します。したがって、投稿内の残りの見出しはh2〜h6を使用する必要があります。

このルールは必須ではありませんが、視覚的な観点、アクセシビリティ、SEOの目的で強く推奨されます。

## ブログコンテンツの画像の保存

マークダウンファイル内で画像を表示するための2つの方法をご紹介します。

> 注意！マークダウンで最適化された画像のスタイルを設定する必要がある場合は、[MDXを使用](https://docs.astro.build/en/guides/images/#images-in-mdx-files)してください。

### `src/assets/`ディレクトリ内（推奨）

`src/assets/`ディレクトリ内に画像を保存できます。これらの画像は[Image Service API](https://docs.astro.build/en/reference/image-service-reference/)を通じてAstroによって自動的に最適化されます。

これらの画像を提供するには、相対パスまたはエイリアスパス（`@/assets/`）を使用できます。

例：`/src/assets/images/example.jpg`にある`example.jpg`を表示したい場合。

```md
![something](@/assets/images/example.jpg)

<!-- または -->

![something](../../assets/images/example.jpg)

<!-- imgタグやImageコンポーネントは動作しません ❌ -->
<img src="@/assets/images/example.jpg" alt="something">
<!-- ^^ これは間違いです -->
```

> 技術的には、`src`配下の任意のディレクトリに画像を保存できます。ここでは`src/assets`は単なる推奨です。

### `public`ディレクトリ内

`public`ディレクトリ内に画像を保存できます。`public`ディレクトリに保存された画像はAstroによって処理されないため、最適化されず、画像の最適化は自分で処理する必要があることに注意してください。

これらの画像には絶対パスを使用する必要があります。また、これらの画像は[マークダウン注釈](https://www.markdownguide.org/basic-syntax/#images-1)または[HTML imgタグ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)を使用して表示できます。

例：`example.jpg`が`/public/assets/images/example.jpg`にある場合。

```md
![something](/assets/images/example.jpg)

<!-- または -->

<img src="/assets/images/example.jpg" alt="something">
```

## ボーナス

### 画像圧縮

ブログ投稿に画像を配置する場合（特に`public`ディレクトリ内の画像）、画像を圧縮することをお勧めします。これはウェブサイト全体のパフォーマンスに影響を与えます。

おすすめの画像圧縮サイト：

- [TinyPng](https://tinypng.com/)
- [TinyJPG](https://tinyjpg.com/)

### OG画像

投稿でOG画像を指定しない場合、デフォルトのOG画像が配置されます。必須ではありませんが、投稿に関連
