import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from '../components/DraggableItem';
import Canvas from '../components/Canvas';
import Cart from '../components/Cart';

export default function Home() {
  const [canvasItems, setCanvasItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const items = [
    // Tops
    { name: 'Top 1', src: '/clothes/tops/shirt.png' },
    { name: 'Top 2', src: '/clothes/tops/top.jpg' },
    { name: 'Top 2', src: '/clothes/tops/top1.png' },
    { name: 'Top 3', src: '/clothes/tops/top2.png' },
    { name: 'Top 4', src: '/clothes/tops/top3.png' },
    { name: 'Top 5', src: '/clothes/tops/top4.png' },
    { name: 'Top 6', src: '/clothes/tops/top5.png' },

    // Bottoms
    { name: 'Bottom 1', src: '/clothes/bottoms/bottom1.png' },
    { name: 'Bottom 2', src: '/clothes/bottoms/bottom2.png' },
    { name: 'Bottom 3', src: '/clothes/bottoms/bottom3.jpg' },
    { name: 'Bottom 4', src: '/clothes/bottoms/bottom4.png' },
    { name: 'Bottom 5', src: '/clothes/bottoms/bottom5.png' },
    { name: 'Bottom 6', src: '/clothes/bottoms/pants.png' },

    // Shoes
    { name: 'Shoe 1', src: '/clothes/shoe/shoes1.png' },
    { name: 'Shoe 2', src: '/clothes/shoe/shoes2.png' },
    { name: 'Shoe 3', src: '/clothes/shoe/shoes3.jpg' },
    { name: 'Shoe 4', src: '/clothes/shoe/shoes4.jpg' },
    { name: 'Shoe 5', src: '/clothes/shoe/shoes5.png' },
  ];

  const handleDrop = (item, offset) => {
    if (!offset) return;

    const canvasRect = document
      .getElementById('canvas-area')
      .getBoundingClientRect();

    const x = offset.x - canvasRect.left;
    const y = offset.y - canvasRect.top;

    setCanvasItems((prev) => [...prev, { ...item, x, y }]);
  };

  const handleSaveOutfit = () => {
    setCartItems(canvasItems);
    alert('✅ Outfit saved to cart!');
  };

  const handleReset = () => {
    setCanvasItems([]);
    setCartItems([]);
    setShowCart(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          🧥 Outfit Builder
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Clothing Items */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Clothing Items</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((item, i) => (
                <DraggableItem key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Canvas */}
          <Canvas canvasItems={canvasItems} onDrop={handleDrop} />

          {/* Cart + Controls */}
          <div className="w-72 flex flex-col gap-4">
            <button
              onClick={handleSaveOutfit}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              💾 Save Outfit
            </button>
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              🛒 {showCart ? 'Hide Cart' : 'Show Cart'}
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              ♻️ Reset
            </button>

            {showCart && <Cart cartItems={cartItems} />}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
