import { PrismaClient } from "@prisma/client";
import { ulid } from "ulid";

const prisma = new PrismaClient();

// 書籍データの生成用の配列
const bookTitles = [
  "JavaScript入門",
  "TypeScript実践ガイド",
  "React開発の教科書",
  "Node.js設計パターン",
  "データベース設計論",
  "アルゴリズム図鑑",
  "システム設計の基礎",
  "プログラミング思考",
  "Web API設計",
  "セキュリティ入門",
  "Docker実践ガイド",
  "Kubernetes完全ガイド",
  "AWS実践入門",
  "Python機械学習",
  "データサイエンス入門",
  "統計学の基礎",
  "ビッグデータ活用",
  "AI開発入門",
  "ブロックチェーン技術",
  "IoT開発ガイド",
  "モバイルアプリ開発",
  "ゲーム開発入門",
  "UI/UXデザイン",
  "プロジェクト管理",
  "アジャイル開発",
  "DevOps実践",
  "マイクロサービス",
  "サーバーレス開発",
  "GraphQL入門",
  "REST API設計",
  "テスト駆動開発",
  "リファクタリング",
  "デザインパターン",
  "オブジェクト指向",
  "関数型プログラミング",
  "並行プログラミング",
  "パフォーマンス最適化",
  "メモリ管理",
  "ネットワーク基礎",
  "Linux入門",
  "情報セキュリティ",
  "データ構造",
  "コンピュータサイエンス",
  "ソフトウェア工学",
  "プログラミング言語論",
  "コンパイラ設計",
  "OS設計",
  "ハードウェア基礎",
  "エンベデッドシステム",
  "リアルタイム処理",
];

const publishers = [
  "技術評論社",
  "オライリー・ジャパン",
  "翔泳社",
  "日経BP",
  "インプレス",
  "SBクリエイティブ",
  "秀和システム",
  "マイナビ出版",
  "日本実業出版社",
  "エムディエヌコーポレーション",
];

// ランダムな値を生成するヘルパー関数
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomPrice(): number {
  const prices = [1980, 2480, 2980, 3480, 3980, 4480, 4980, 5480];
  return getRandomElement(prices);
}

function getRandomStock(): number {
  return Math.floor(Math.random() * 100) + 1; // 1-100の在庫
}

function getRandomDate(): Date {
  const start = new Date(2020, 0, 1);
  const end = new Date(2024, 11, 31);
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime);
}

async function main() {
  console.log("書籍データのseedを開始します...");

  // 既存のデータを削除
  await prisma.book.deleteMany();
  console.log("既存の書籍データを削除しました");

  const books: {
    id: string;
    name: string;
    price: number;
    stock: number;
    isPaperbook: boolean;
    publishAt: Date;
    isSaled: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[] = [];

  // 100件の書籍データを生成
  for (let i = 0; i < 100; i++) {
    const title = getRandomElement(bookTitles);
    const publisher = getRandomElement(publishers);
    const isVolumeTitle = Math.random() < 0.3; // 30%の確率でシリーズ本

    const bookName = isVolumeTitle
      ? `${title} 第${Math.floor(Math.random() * 5) + 1}版`
      : `${title} - ${publisher}`;

    books.push({
      id: ulid(),
      name: bookName,
      price: getRandomPrice(),
      stock: getRandomStock(),
      isPaperbook: Math.random() < 0.7, // 70%の確率でペーパーブック
      publishAt: getRandomDate(),
      isSaled: Math.random() < 0.9, // 90%の確率で販売中
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // バッチで挿入
  await prisma.book.createMany({
    data: books,
  });

  console.log(`${books.length}件の書籍データを作成しました`);

  // 作成されたデータの確認
  const count = await prisma.book.count();
  console.log(`データベース内の書籍数: ${count}`);

  // サンプルデータの表示
  const sampleBooks = await prisma.book.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      isPaperbook: true,
      isSaled: true,
    },
  });

  console.log("\nサンプルデータ:");
  console.table(sampleBooks);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
