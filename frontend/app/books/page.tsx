"use client";

import Link from "next/link";

// 仮の書籍データ
const books = [
  {
    id: 1,
    title: "TypeScript入門",
    author: "山田太郎",
    price: 2800,
    image: "/api/placeholder/200/300",
    description: "TypeScriptの基本から応用まで学べる入門書"
  },
  {
    id: 2,
    title: "Next.js完全ガイド",
    author: "佐藤花子",
    price: 3200,
    image: "/api/placeholder/200/300",
    description: "React FrameworkのNext.jsを徹底解説"
  },
  {
    id: 3,
    title: "DDD実践入門",
    author: "田中一郎",
    price: 3800,
    image: "/api/placeholder/200/300",
    description: "ドメイン駆動設計の基礎と実践"
  },
  {
    id: 4,
    title: "クリーンアーキテクチャ",
    author: "ロバート・C・マーティン",
    price: 4200,
    image: "/api/placeholder/200/300",
    description: "保守性の高いソフトウェアの設計手法"
  },
  {
    id: 5,
    title: "JavaScript最新仕様",
    author: "鈴木次郎",
    price: 2600,
    image: "/api/placeholder/200/300",
    description: "ES2023対応のJavaScript完全リファレンス"
  },
  {
    id: 6,
    title: "Webセキュリティ実践",
    author: "高橋美咲",
    price: 3500,
    image: "/api/placeholder/200/300",
    description: "実際のケーススタディで学ぶWebセキュリティ"
  }
];

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            {/* Book icon */}
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">BookStore</h1>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link
              href="/books"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              書籍一覧
            </Link>
            <Link
              href="/login"
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              ログイン
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">書籍一覧</h2>
          <p className="text-gray-600">技術書を中心とした厳選された書籍をご紹介します</p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Book Image Placeholder */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <p className="text-sm text-gray-500 mb-3">{book.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    ¥{book.price.toLocaleString()}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                    カートに追加
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}