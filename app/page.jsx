'use client';
import { useState } from "react";

export default function POS() {
  const [code, setCode] = useState("");
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/product?code=${code}`);
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setProduct(data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("商品情報の取得に失敗しました");
    }
  };

  const addToCart = (product) => {
    if (!product || !product.prd_id) {
      alert("商品がマスタ未登録です");
      return;
    }
    setCart((prevCart) => [...prevCart, product]);
    setCode("");
    setProduct({});
  };

  const purchase = () => {
    window.alert("購入が完了しました");
    setCart([]);
  };

  return (
    <div className="container mx-auto p-6 flex flex-wrap">
      {/* 左側の入力・追加パネル */}
      <div className="w-full md:w-1/2 p-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="バーコードを入力"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 text-center text-gray-500"
        />

        <button
          onClick={fetchProduct}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4"
        >
          商品コード 読み込み
        </button>

        {/* 商品情報 */}
        <div className="border border-gray-300 rounded-lg p-2 mb-2 text-center text-gray-500">
          商品名称
        </div>
        <div className="border border-gray-300 rounded-lg p-2 mb-4 text-center text-gray-500">
          単価
        </div>

        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          追加
        </button>
      </div>

      {/* 右側の購入リストと購入ボタン */}
      <div className="w-full md:w-1/2 p-4">
        <div className="rounded-lg p-4 mb-4 border border-gray-300">
          <h3 className="text-center font-semibold mb-2">購入リスト</h3>
          <ul>
            {cart.length === 0 ? (
              <li className="text-gray-500 text-center">購入リストは空です</li>
            ) : (
              cart.map((item, index) => (
                <li key={index} className="border-b py-1">
                  {item.name} ×1 {item.price}円
                </li>
              ))
            )}
          </ul>
        </div>

        <button
          onClick={purchase}
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          購入
        </button>
      </div>
    </div>
  );
}
