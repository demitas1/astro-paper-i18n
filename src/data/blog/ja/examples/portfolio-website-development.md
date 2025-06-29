---
title: ポートフォリオウェブサイトとブログの開発方法
author: Sat Naing
pubDatetime: 2022-03-25T16:55:12.000+00:00
slug: ja/how-do-i-develop-my-portfolio-and-blog
featured: false
draft: false
tags:
  - NextJS
  - TailwindCSS
  - HeadlessCMS
  - Blog
description: "サンプル記事：NextJSとヘッドレスCMSを使用して初めてのポートフォリオウェブサイトとブログを開発した経験について。"
timezone: "Asia/Yangon"
---

> この記事は私の[ブログ記事](https://satnaing.dev/blog/posts/how-do-i-develop-my-portfolio-and-blog)から転載したものです。AstroPaperテーマを使用してブログ記事を書く方法を説明するために掲載しています。

NextJSとヘッドレスCMSを使用して初めてのポートフォリオウェブサイトとブログを開発した経験について。

![ポートフォリオの構築](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg&w=2048&q=75)

## モチベーション

大学生の頃から、自分のドメイン名(**satnaing.dev**)で独自のウェブサイトを立ち上げることを考えていました。しかし、このプロジェクトまでそれは実現しませんでした。ウェブアプリケーション開発に関する複数のプロジェクトや作業を行ってきましたが、これに取り組む努力はしていませんでした。

では、「ブログはどうなの？」と聞かれるかもしれません。はい、ブログも以前からプロジェクトリストに入っていました。最新のテクノロジーを使用してブログプロジェクトを作りたいと常に考えていました。しかし、仕事や他のプロジェクトで忙しく、ブログプロジェクトを始めることができませんでした。

最近では、量より質を重視して自分のプロジェクトを開発する傾向があります。プロジェクト完了後は、通常GitHubリポジトリに適切なreadmeファイルを配置します。しかし、GitHubリポジトリのreadmeは技術的な側面にのみ適していると考えています。経験や課題について書き留めたいと思い、自分のブログを作ることを決めました。さらに、この時点で、このプロジェクトを開発するための十分な経験と自信がありました。

## 技術スタック

フロントエンドには、[React](https://reactjs.org/ "React公式ウェブサイト")を使用したいと考えていました。しかし、ReactだけではSEOには不十分でした。また、ルーティングや画像の最適化など、多くの要因を考慮する必要がありました。そこで、メインのフロントエンドスタックとして[NextJS](https://nextjs.org/ "NextJS公式ウェブサイト")を選択しました。そしてもちろん、型チェックのためにTypeScriptを使用しています（慣れると TypeScriptが好きになると言われています😉）。

スタイリングには、[TailwindCSS](https://tailwindcss.com/ "Tailwind CSS公式ウェブサイト")を使用しています。これは、Tailwindが提供する開発者体験が気に入っているためと、MUIやReact Bootstrapなどの他のコンポーネントUIライブラリと比較して柔軟性が高いためです。

このプロジェクトのすべてのコンテンツはGitHubリポジトリに保存されています。私はMarkdown形式に慣れているため、このブログ記事を含むすべての投稿はMarkdownファイル形式で書かれています。しかし、frontmatterを含むMarkdownを簡単に書くために、[Forestry](https://forestry.io/ "Forestry公式ウェブサイト")ヘッドレスCMSを使用しています。これはMarkdownやその他のコンテンツを提供できるGitベースのCMSです。これにより、Markdownまたはwysiwygエディタのいずれかを使用してコンテンツを書くことができます。また、frontmattersの作成も簡単です。

画像やアセットは[Cloudinary](https://cloudinary.com/ "Cloudinary公式ウェブサイト")にアップロードして保存しています。ForestryからCloudinaryに接続し、ダッシュボードで直接管理しています。

結論として、このプロジェクトで使用した技術スタックは以下の通りです：

- フロントエンド：NextJS (TypeScript)
- スタイリング：TailwindCSS
- アニメーション：GSAP
- CMS：Forestry Headless CMS
- デプロイメント：Vercel

## 機能

私のポートフォリオとブログの主な機能は以下の通りです：

### SEOフレンドリー

プロジェクト全体がSEOを念頭に置いて開発されています。適切なメタタグ、説明、見出しの配置を使用しています。このウェブサイトは現在Googleにインデックスされています。

> 'sat naing dev'などのキーワードを使用してGoogleでこのウェブサイトを検索できます

![Googleでsatnaing.devを検索](https://res.cloudinary.com/noezectz/image/upload/v1648231400/SatNaing/satnaing-on-google_asflq6.png "satnaing.devはインデックスされています")

さらに、適切なメタタグを使用しているため、ソーシャルメディアで共有した際にもこのウェブサイトは適切に表示されます。

![Facebookで共有した際のsatnaing.devのカードレイアウト](https://res.cloudinary.com/noezectz/image/upload/v1653106955/SatNaing/satnaing-dev-share-on-facebook_1_zjoehx.png "Facebookで共有した際のカードレイアウト")

### 動的サイトマップ

サイトマップはSEOにおいて重要な役割を果たします。そのため、このサイトのすべてのページはsitemap.xmlに含まれている必要があります。新しいコンテンツやタグ、カテゴリーを作成するたびに自動生成されるサイトマップを実装しました。

### ライト＆ダークテーマ

近年のダークテームのトレンドにより、多くのウェブサイトがダークテーマをデフォルトで提供しています。もちろん、私のウェブサイトもライトテーマとダークテーマの両方をサポートしています。

### 完全なアクセシビリティ

このウェブサイトは完全にアクセシブルです。キーボードのみで操作することができます。すべての画像に代替テキストを含める、見出しをスキップしない、セマンティックなHTMLタグを使用する、aria属性を適切に使用するなど、すべてのa11y改善のベストプラクティスを実装しています。

### 検索ボックス、カテゴリー＆タグ

すべてのブログコンテンツは検索ボックスで検索できます。さらに、コンテンツはカテゴリーとタグでフィルタリングできます。これにより、ブログ読者は自分が本当に読みたいものを検索して読むことができます。

### パフォーマンスとLighthouseスコア

適切な開発とベストプラクティスのおかげで、このウェブサイトは非常に良いパフォーマンスとLighthouseスコアを獲得しています。以下がこのウェブサイトのLighthouseスコアです。

![satnaing.devのLighthouseスコア](https://user-images.githubusercontent.com/53733092/159957822-7082e459-11e9-4616-8f1e-49d0881f7cbb.png "satnaing.devのLighthouseスコア")

### アニメーション

当初、このウェブサイトのアニメーションとマイクロインタラクションには[Framer Motion](https://www.framer.com/motion/ "Framer Motion")を使用していました。しかし、複雑なアニメーションやパララックス効果を試みた際に、Framer Motionとの統合が不便だと感じました（おそらく私がそれに熟練していなかったためです）。そこで、すべてのアニメーションに[GSAP](https://greensock.com/ "GSAPアニメーションライブラリ")を使用することにしました。これは最も人気のあるアニメーションライブラリの1つで、複雑で高度なアニメーションを実現できます。このウェブサイトのほぼすべてのページでアニメーションとマイクロインタラクションを見ることができます。

![satnaing.devのアニメーション](https://res.cloudinary.com/noezectz/image/upload/v1653108324/SatNaing/ezgif.com-gif-maker_2_hehtlm.gif "satnaing.devウェブサイト")

## おわりに

結論として、このプロジェクトはブログサイト（SSG）の開発について多くの経験と自信を与えてくれました。GitベースのCMSとNextJSとの連携について知識を得ることができました。また、SEO、動的サイトマップ生成、Googleインデックス手順についても学びました。今後さらに良いプロジェクトを作っていきます。ご期待ください！ ✌🏻

そして...最後に、ウェブサイトのヒーローセクションに美しいイラストを描いてくれた友人の[Swann Fevian Kyaw](https://www.facebook.com/bon.zai.3910 "Swann Fevian Kyawのフェイスブックアカウント")（@[ToonHa](https://www.facebook.com/ToonHa-102639465752883 "ToonHaフェイスブックページ")）に感謝を述べたいと思います。

## プロジェクトリンク

- ウェブサイト：[https://satnaing.dev/](https://satnaing.dev/ "https://satnaing.dev/")
- ブログ：[https://satnaing.dev/blog](https://satnaing.dev/blog "https://satnaing.dev/blog")
- リポジトリ：[https://github.com/satnaing/my-portfolio](https://github.com/satnaing/my-portfolio "https://github.com/satnaing/my-portfolio")
