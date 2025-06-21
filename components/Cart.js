import Image from 'next/image';

export default function Cart({ cartItems }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="text-xl font-semibold mb-4">🛒 Cart</h3>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-sm">No outfit saved yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {cartItems.map((item, i) => (
            <div
              key={i}
              title={item.name}
              className="w-20 h-20 border rounded-md overflow-hidden bg-gray-100"
            >
              <Image
                src={item.src}
                alt={item.name}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
