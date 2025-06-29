---
author: Simon Smale
pubDatetime: 2024-01-03T20:40:08Z
modDatetime: 2024-01-08T18:59:05Z
title: Gitフックを使用して作成日と更新日を設定する方法
featured: false
draft: false
tags:
  - docs
  - FAQ
canonicalURL: https://smale.codes/posts/setting-dates-via-git-hooks/
description: AstroPaperでGitフックを使用して作成日と更新日を設定する方法
---

この投稿では、AstroPaperブログテーマのフロントマターで作成日(`pubDatetime`)と更新日(`modDatetime`)の入力を自動化するためのpre-commit Gitフックの使用方法について説明します。

## 目次

## どこでも使用可能

[Gitフック](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)は、コミットメッセージへのブランチ名の[追加](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea)や[チェック](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e)、[プレーンテキストのシークレットのコミット防止](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000)などのタスクを自動化するのに最適です。最大の欠点は、クライアントサイドのフックがマシンごとに設定が必要なことです。

`hooks`ディレクトリを作成して`.git/hooks`ディレクトリに手動でコピーするか、シンボリックリンクを設定することで回避できますが、これらは設定を忘れないようにする必要があり、私は得意ではありません。

このプロジェクトはnpmを使用しているため、[Husky](https://typicode.github.io/husky/)というパッケージ(AstroPaperにはすでにインストールされています)を使用してフックを自動的にインストールすることができます。

> 更新情報! AstroPaper [v4.3.0](https://github.com/satnaing/astro-paper/releases/tag/v4.3.0)では、GitHub Actionsを優先してpre-commitフックが削除されました。ただし、[Huskyを簡単にインストール](https://typicode.github.io/husky/get-started.html)することができます。

## フック

日付を更新してそれを変更の一部としてコミットするために、`pre-commit`フックを使用します。これはすでにAstroPaperプロジェクトで設定されていますが、設定されていない場合は`npx husky add .husky/pre-commit 'echo "This is our new pre-commit hook"'`を実行します。

`hooks/pre-commit`ファイルに移動して、以下のスニペットの1つまたは両方を追加します。

### ファイル編集時の更新日の更新

---

更新:

このセクションは、より賢いフックの新バージョンに更新されました。投稿が公開されるまで`modDatetime`を更新しないようになりました。最初の公開時にドラフトステータスを`first`に設定すると、マジックが起こります。

---

```shell
# Modified files, update the modDatetime
git diff --cached --name-status |
grep -i '^M.*\.md$' |
while read _ file; do
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
  if [ "$draft" = "false" ]; then
    echo "$file modDateTime updated"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
    mv tmp $file
    git add $file
  fi
  if [ "$draft" = "first" ]; then
    echo "First release of $file, draft set to false and modDateTime removed"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/" | sed "/---.*/,/---.*/s/^draft:.*$/draft: false/" > tmp
    mv tmp $file
    git add $file
  fi
done
```

`git diff --cached --name-status`は、コミット用にステージングされたファイルをgitから取得します。出力は以下のようになります：

```shell
A       src/content/blog/setting-dates-via-git-hooks.md
```

先頭の文字はどのアクションが実行されたかを示します。上記の例ではファイルが追加されました。変更されたファイルは`M`です。

その出力をgrepコマンドにパイプして、変更されたファイルの各行を探します。行は`M`で始まり(`^(M)`)、その後に任意の文字が続き(`.*`)、`.md`ファイル拡張子(`.(md)$`)で終わる必要があります。これにより、変更されたマークダウンファイル以外の行がフィルタリングされます。

---

#### 改善点 - より明示的に

`blog`ディレクトリ内のマークダウンファイルのみを探すように追加できます。これらは正しいフロントマターを持つ唯一のファイルだからです。

---

正規表現は文字とファイルパスの2つの部分をキャプチャします。このリストをwhileループにパイプして、一致する行を反復処理し、文字を`a`に、パスを`b`に割り当てます。今のところ`a`は無視します。

ファイルのドラフトステータスを知るために、フロントマターが必要です。以下のコードでは、`cat`を使用してファイルの内容を取得し、`awk`を使用してフロントマターセパレータ(`---`)でファイルを分割し、2番目のブロック(フロントマター、`---`の間の部分)を取得します。そこから再度`awk`を使用してdraftキーを見つけてその値を出力します。

```shell
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
```

これで`draft`の値が分かったので、3つのうち1つを実行します：modDatetimeを現在に設定する(draftがfalseの場合`if [ "$draft" = "false" ]; then`)、modDatetimeをクリアしてdraftをfalseに設定する(draftがfirstに設定されている場合`if [ "$draft" = "first" ]; then`)、または何もしない(その他の場合)。

sedコマンドを使用する次の部分は、あまり使用しないため私にとっては少し魔法のようですが、[同様のことを行う別のブログ投稿](https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/)からコピーしました。本質的には、ファイルのフロントマタータグ(`---`)内で`pubDatetime:`キーを探し、行全体を見つけて`pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/`という同じキーと正しくフォーマットされた現在の日時に置き換えます。

この置換はファイル全体のコンテキストで行われるため、一時ファイル(`> tmp`)に出力し、新しいファイルを古いファイルの場所に移動(`mv`)して上書きします。これは自分で変更を加えたかのようにgitに追加されコミットの準備が整います。

---

#### 注意

`sed`が機能するには、フロントマターにすでに`modDatetime`キーが存在している必要があります。空の日付でアプリをビルドするには他の変更も必要です。[下記](#empty-moddatetime-changes)を参照してください。

---

### 新規ファイルの日付追加

新規ファイルの日付追加は上記と同じプロセスですが、今回は追加された行(`A`)を探し、`pubDatetime`の値を置き換えます。

```shell
# New files, add/update the pubDatetime
git diff --cached --name-status | egrep -i "^(A).*\.(md)$" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
  mv tmp $b
  git add $b
done
```

---

#### 改善点 - 1回のループのみ

ループ内で`a`変数を使用してスイッチし、1回のループで`modDatetime`を更新するか`pubDatetime`を追加するかを選択できます。

---

## フロントマターの入力

IDEがスニペットをサポートしている場合、フロントマターを入力するカスタムスニペットを作成することができます。[AstroPaper v4ではVSCode用のデフォルトスニペットが同梱される予定です。](https://github.com/satnaing/astro-paper/pull/206)

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0" type="video/mp4">
</video>

## 空の`modDatetime`の変更

Astroがマークダウンをコンパイルして処理するには、フロントマターで何が期待されているかを知る必要があります。これは`src/content/config.ts`の設定で行われます。

キーを値なしで存在させるには、10行目に`.nullable()`関数を追加する必要があります。

```typescript
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
-     modDatetime: z.date().optional(),
+     modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(),
    }),
});
```

ブログエンジンファイルでIDEが警告を出さないようにするために、以下も行いました：

1. `src/layouts/Layout.astro`の15行目に`| null`を追加して以下のようにします：

```typescript
export interface Props {
  title?: string;
  author?: string;
  description?: string;
  ogImage?: string;
  canonicalURL?: string;
  pubDatetime?: Date;
  modDatetime?: Date | null;
}
```

2. `src/components/Datetime.tsx`の5行目に`| null`を追加して以下のようにします：

```typescript
interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
}
```
