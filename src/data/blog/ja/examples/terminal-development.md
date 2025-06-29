---
title: Reactを使用してターミナル風ポートフォリオウェブサイトを開発する方法
author: Sat Naing
pubDatetime: 2022-06-09T03:42:51Z
slug: ja/how-do-i-develop-my-terminal-portfolio-website-with-react
featured: false
draft: false
tags:
  - JavaScript
  - ReactJS
  - ContextAPI
  - Styled-Components
  - TypeScript
description:
  "サンプル投稿：ReactJS、TypeScript、Styled-Componentsを使用してターミナル風ウェブサイトを開発。
  オートコンプリート、複数のテーマ、コマンドヒントなどの機能を含む。"
timezone: "Asia/Yangon"
---

> この記事は私の[ブログ投稿](https://satnaing.dev/blog/posts/how-do-i-develop-my-terminal-portfolio-website-with-react)から転載したものです。AstroPaperテーマを使用してブログ記事を書く方法を示すために、この記事を掲載しています。

ReactJS、TypeScript、Styled-Componentsを使用してターミナル風ウェブサイトを開発。オートコンプリート、複数のテーマ、コマンドヒントなどの機能を含みます。

![Sat Naingのターミナルポートフォリオ](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png&w=2048&q=75)

## 目次

## はじめに

最近、私はポートフォリオとブログを開発・公開し、良いフィードバックをいただきました。今回は、新しく開発したターミナル風ポートフォリオウェブサイトを紹介したいと思います。これはReactJSとTypeScriptを使用して開発されました。このアイデアはCodePenとYouTubeから得ました。

## 技術スタック

このプロジェクトはバックエンドコードを含まないフロントエンドプロジェクトです。UI/UX部分はFigmaで設計しました。フロントエンドのユーザーインターフェースには、素のJavaScriptやNextJSではなくReactを選択しました。その理由は：

- 第一に、宣言的なコードを書きたかったからです。JavaScriptを使って命令的にHTML DOMを管理するのは本当に面倒です。
- 第二に、それはReactだからです！高速で信頼性があります。
- 最後に、NextJSが提供するSEO機能、ルーティング、画像最適化はあまり必要としていませんでした。

そしてもちろん、型チェック用のTypeScriptもあります。

スタイリングについては、普段とは異なるアプローチを取りました。Pure CSS、Sass、またはTailwindCSSのようなユーティリティCSSフレームワークの代わりに、CSS-in-JS（Styled-Components）を選択しました。Styled-Componentsについては以前から知っていましたが、実際に試したことはありませんでした。そのため、このプロジェクトでのStyled-Componentsの記述スタイルと構造は、あまり整理されていないかもしれません。

このプロジェクトは非常に複雑な状態管理を必要としません。複数のテーマ対応とプロップドリリングを避けるために、ContextAPIを使用しています。

技術スタックの簡単なまとめです：

- フロントエンド: [ReactJS](https://reactjs.org/ "React Website"), [TypeScript](https://www.typescriptlang.org/ "TypeScript Website")
- スタイリング: [Styled-Components](https://styled-components.com/ "Styled-Components Website")
- UI/UX: [Figma](https://figma.com/ "Figma Website")
- 状態管理: [ContextAPI](https://reactjs.org/docs/context.html "React ContextAPI")
- デプロイ: [Netlify](https://www.netlify.com/ "Netlify Website")

## 機能

プロジェクトの主な機能を紹介します。

### 複数のテーマ

ユーザーは複数のテーマを切り替えることができます。この記事を書いている時点で5つのテーマがあり、将来的にはさらに追加される予定です。選択したテーマはローカルストレージに保存されるため、ページを更新してもテーマは変更されません。

![異なるテーマの設定](https://i.ibb.co/fSTCnWB/terminal-portfolio-multiple-themes.gif)

### コマンドライン補完

実際のターミナルに可能な限り近い見た目と操作感を実現するため、'Tab'または'Ctrl + i'を押すだけで部分的に入力されたコマンドを自動補完する機能を実装しました。

![コマンドライン補完のデモンストレーション](https://i.ibb.co/CQTGGLF/terminal-autocomplete.gif)

### 過去のコマンド

ユーザーは上下の矢印キーを押すことで、以前入力したコマンドに戻ったり、過去のコマンドをナビゲートしたりすることができます。

![上矢印キーで過去のコマンドに戻る](https://i.ibb.co/vD1pSRv/terminal-up-down.gif)

### コマンド履歴の表示/クリア

以前入力したコマンドは、コマンドラインで'history'と入力することで表示できます。すべてのコマンド履歴とターミナル画面は、'clear'と入力するか'Ctrl + l'を押すことでクリアできます。

![clearコマンドまたはCtrl + Lでターミナルをクリアする](https://i.ibb.co/SJBy8Rr/terminal-clear.gif)

## おわりに

これは本当に楽しいプロジェクトでした。このプロジェクトの特別な点は、フロントエンドプロジェクトであるにもかかわらず、ユーザーインターフェースよりもロジックに焦点を当てなければならなかったことです。

## プロジェクトリンク

- Webサイト: [https://terminal.satnaing.dev/](https://terminal.satnaing.dev/ "https://terminal.satnaing.dev/")
- リポジトリ: [https://github.com/satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio "https://github.com/satnaing/terminal-portfolio")
