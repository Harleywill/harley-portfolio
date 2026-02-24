'use client'

import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Analytics Demo Data
const analyticsData = [
  { day: 'Mon', users: 1200, sessions: 1891, pageViews: 2400, bounce: 24 },
  { day: 'Tue', users: 1290, sessions: 2398, pageViews: 2210, bounce: 13 },
  { day: 'Wed', users: 1000, sessions: 9800, pageViews: 2290, bounce: 22 },
  { day: 'Thu', users: 1880, sessions: 3908, pageViews: 2000, bounce: 22 },
  { day: 'Fri', users: 2390, sessions: 3800, pageViews: 2181, bounce: 25 },
  { day: 'Sat', users: 2490, sessions: 4300, pageViews: 2500, bounce: 12 },
  { day: 'Sun', users: 2100, sessions: 3490, pageViews: 2100, bounce: 8 },
]

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: 'Active' | 'Low Stock' | 'Out of Stock'
}

interface Order {
  id: string
  customer: string
  amount: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered'
  date: string
}

interface Discount {
  code: string
  discount: string
  uses: number
  maxUses: number
  active: boolean
}

type DemoTab = 'analytics' | 'products' | 'orders' | 'discounts'

export default function AdminDemos() {
  const [activeTab, setActiveTab] = useState<DemoTab>('analytics')

  // Products State
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '100mm Inline Fan', category: 'Fans', price: 45.99, stock: 124, status: 'Active' },
    { id: 2, name: 'Flexible Ducting 5m', category: 'Ducting', price: 32.50, stock: 87, status: 'Active' },
    { id: 3, name: 'Damper Unit', category: 'Dampers', price: 28.00, stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Wall Vent Adapter', category: 'Vents', price: 15.99, stock: 342, status: 'Active' },
    { id: 5, name: 'Installation Kit', category: 'Accessories', price: 12.00, stock: 56, status: 'Low Stock' },
  ])
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' })

  // Orders State
  const [orders, setOrders] = useState<Order[]>([
    { id: '#ORD-001', customer: 'John Smith', amount: 245.99, status: 'Delivered', date: '2026-02-20' },
    { id: '#ORD-002', customer: 'Sarah Johnson', amount: 156.50, status: 'Processing', date: '2026-02-22' },
    { id: '#ORD-003', customer: 'Mike Brown', amount: 89.99, status: 'Shipped', date: '2026-02-23' },
    { id: '#ORD-004', customer: 'Emma Wilson', amount: 312.75, status: 'Pending', date: '2026-02-24' },
  ])
  const [newOrder, setNewOrder] = useState({ customer: '', amount: '' })

  // Discounts State
  const [discounts, setDiscounts] = useState<Discount[]>([
    { code: 'SAVE10', discount: '10%', uses: 234, maxUses: 500, active: true },
    { code: 'FREESHIP', discount: 'Free Shipping', uses: 156, maxUses: 1000, active: true },
    { code: 'SUMMER20', discount: '20%', uses: 89, maxUses: 200, active: false },
    { code: 'VIP15', discount: '15%', uses: 45, maxUses: 100, active: true },
  ])
  const [newDiscount, setNewDiscount] = useState({ code: '', discount: '', maxUses: '' })
  const [showNewDiscount, setShowNewDiscount] = useState(false)

  // Product Functions
  const addProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      setProducts([
        ...products,
        {
          id: Math.max(...products.map(p => p.id), 0) + 1,
          name: newProduct.name,
          category: newProduct.category,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          status: parseInt(newProduct.stock) === 0 ? 'Out of Stock' : parseInt(newProduct.stock) < 100 ? 'Low Stock' : 'Active',
        },
      ])
      setNewProduct({ name: '', category: '', price: '', stock: '' })
      setEditingProduct(null)
    }
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  // Order Functions
  const addOrder = () => {
    if (newOrder.customer && newOrder.amount) {
      const currentOrders = orders.length > 0 ? orders : [{ id: '#ORD-000' }]
      const orderNum = Math.max(...currentOrders.map(o => parseInt(o.id.split('-')[1])), 0) + 1
      setOrders([
        ...orders,
        {
          id: `#ORD-${String(orderNum).padStart(3, '0')}`,
          customer: newOrder.customer,
          amount: parseFloat(newOrder.amount),
          status: 'Pending',
          date: new Date().toISOString().split('T')[0],
        },
      ])
      setNewOrder({ customer: '', amount: '' })
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)))
  }

  // Discount Functions
  const addDiscount = () => {
    if (newDiscount.code && newDiscount.discount && newDiscount.maxUses) {
      setDiscounts([
        ...discounts,
        {
          code: newDiscount.code,
          discount: newDiscount.discount,
          uses: 0,
          maxUses: parseInt(newDiscount.maxUses),
          active: true,
        },
      ])
      setNewDiscount({ code: '', discount: '', maxUses: '' })
      setShowNewDiscount(false)
    }
  }

  const toggleDiscount = (code: string) => {
    setDiscounts(discounts.map(d => (d.code === code ? { ...d, active: !d.active } : d)))
  }

  const deleteDiscount = (code: string) => {
    setDiscounts(discounts.filter(d => d.code !== code))
  }

  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Admin Dashboard <span className="text-accent-lime">Features</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Interactive demonstrations of the TRVentilation admin panel capabilities. These are fully
            functional demos showcasing real features - no live data modifications.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['analytics', 'products', 'orders', 'discounts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as DemoTab)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-accent-lime text-dark'
                  : 'bg-black/50 text-gray-400 hover:text-white border border-gray-700/50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-black/50 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8">
          {/* Analytics Demo */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">GA4 Real-Time Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Active Users (24h)', value: '2,391', trend: '+12%' },
                    { label: 'Sessions', value: '12,456', trend: '+8%' },
                    { label: 'Page Views', value: '34,891', trend: '+15%' },
                    { label: 'Bounce Rate', value: '16.4%', trend: '-3%' },
                  ].map((metric, idx) => (
                    <div key={idx} className="bg-dark/50 p-4 rounded-lg border border-gray-700/30">
                      <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <p className="text-accent-lime text-sm mt-1">{metric.trend}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4 text-white">Weekly Traffic Trends</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #666' }} />
                    <Legend />
                    <Line type="monotone" dataKey="pageViews" stroke="#ccff00" strokeWidth={2} />
                    <Line type="monotone" dataKey="sessions" stroke="#ff9933" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Products Demo */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Product Management</h3>
                <button
                  onClick={() => setEditingProduct(editingProduct === 0 ? null : 0)}
                  className="px-4 py-2 bg-accent-lime text-dark rounded-lg font-semibold hover:bg-accent-lime/90"
                >
                  {editingProduct === 0 ? '✕ Cancel' : '+ Add Product'}
                </button>
              </div>

              {editingProduct === 0 && (
                <div className="bg-dark/50 p-6 rounded-lg border border-gray-700/30 mb-6">
                  <h4 className="text-lg font-bold mb-4 text-white">Add New Product</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white placeholder-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white placeholder-gray-500"
                    />
                    <input
                      type="number"
                      placeholder="Price (£)"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white placeholder-gray-500"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white placeholder-gray-500"
                    />
                  </div>
                  <button
                    onClick={addProduct}
                    className="px-4 py-2 bg-accent-lime text-dark rounded-lg font-semibold hover:bg-accent-lime/90"
                  >
                    Create Product
                  </button>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700/50">
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Price</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Stock</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-700/30 hover:bg-dark/30 transition">
                        <td className="py-3 px-4 text-white">{product.name}</td>
                        <td className="py-3 px-4 text-gray-400">{product.category}</td>
                        <td className="py-3 px-4 text-accent-lime font-semibold">£{product.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-white">{product.stock}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              product.status === 'Active'
                                ? 'bg-green-500/20 text-green-400'
                                : product.status === 'Low Stock'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-400 hover:text-red-300 font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Demo */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Order Management</h3>
                <button
                  onClick={() => setEditingProduct(editingProduct === -1 ? null : -1)}
                  className="px-4 py-2 bg-accent-lime text-dark rounded-lg font-semibold hover:bg-accent-lime/90"
                >
                  {editingProduct === -1 ? '✕ Cancel' : '+ Create Order'}
                </button>
              </div>

              {editingProduct === -1 && (
                <div className="bg-dark/50 p-6 rounded-lg border border-gray-700/30 mb-6">
                  <h4 className="text-lg font-bold mb-4 text-white">Create New Order</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Customer Name"
                      value={newOrder.customer}
                      onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                      className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white placeholder-gray-500"
                    />
                    <input
                      type="number"
                      placeholder="Order Amount (£)"
                      value={newOrder.amount}
                      onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
                      className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white placeholder-gray-500"
                    />
                  </div>
                  <button
                    onClick={addOrder}
                    className="px-4 py-2 bg-accent-lime text-dark rounded-lg font-semibold hover:bg-accent-lime/90"
                  >
                    Create Order
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-dark/50 p-4 rounded-lg border border-gray-700/30 hover:border-accent-lime/50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-bold text-lg">{order.id}</p>
                        <p className="text-gray-400 text-sm">{order.customer}</p>
                        <p className="text-gray-500 text-xs mt-1">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-accent-lime font-bold text-xl">£{order.amount.toFixed(2)}</p>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${
                            order.status === 'Delivered'
                              ? 'bg-green-500/20 text-green-400'
                              : order.status === 'Processing'
                                ? 'bg-blue-500/20 text-blue-400'
                                : order.status === 'Shipped'
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Discounts Demo */}
          {activeTab === 'discounts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Discount Code Management</h3>
                <button
                  onClick={() => setShowNewDiscount(!showNewDiscount)}
                  className="px-4 py-2 bg-accent-lime text-dark rounded-lg font-semibold hover:bg-accent-lime/90"
                >
                  {showNewDiscount ? '✕ Cancel' : '+ Create Code'}
                </button>
              </div>

              {showNewDiscount && (
                <div className="bg-dark/50 p-6 rounded-lg border border-gray-700/30 mb-6">
                  <h4 className="text-lg font-bold mb-4 text-white">Create New Discount Code</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Code (e.g., SUMMER20)"
                      value={newDiscount.code}
                      onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value.toUpperCase() })}
                      className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white placeholder-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="Discount (e.g., 20% or Free Shipping)"
                      value={newDiscount.discount}
                      onChange={(e) => setNewDiscount({ ...newDiscount, discount: e.target.value })}
                      className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white placeholder-gray-500"
                    />
                    <input
                      type="number"
                      placeholder="Max Uses"
                      value={newDiscount.maxUses}
                      onChange={(e) => setNewDiscount({ ...newDiscount, maxUses: e.target.value })}
                      className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white placeholder-gray-500"
                    />
                  </div>
                  <button
                    onClick={addDiscount}
                    className="px-4 py-2 bg-accent-lime text-dark rounded-lg font-semibold hover:bg-accent-lime/90"
                  >
                    Create Code
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {discounts.map((discount) => (
                  <div
                    key={discount.code}
                    className="bg-dark/50 p-6 rounded-lg border border-gray-700/30 hover:border-accent-lime/50 transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-white font-bold text-xl">{discount.code}</p>
                        <p className="text-accent-orange font-semibold text-lg mt-1">{discount.discount}</p>
                      </div>
                      <button
                        onClick={() => toggleDiscount(discount.code)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                          discount.active
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        }`}
                      >
                        {discount.active ? 'Active' : 'Inactive'}
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Uses</span>
                        <span className="text-white font-semibold">
                          {discount.uses} / {discount.maxUses}
                        </span>
                      </div>
                      <div className="w-full bg-dark h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-accent-lime h-full"
                          style={{ width: `${(discount.uses / discount.maxUses) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteDiscount(discount.code)}
                        className="flex-1 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded hover:border-red-500/60 text-red-400 text-sm font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-accent-lime/10 border border-accent-lime/20 rounded-lg p-6">
          <p className="text-accent-lime font-semibold mb-2">✓ Demo Features</p>
          <p className="text-gray-300 text-sm">
            These are fully interactive demonstrations of the TRVentilation admin dashboard. All data shown is sample/test data.
            No changes are made to the actual TRVentilation platform. This showcases the admin capabilities available for managing
            products, orders, discounts, and analyzing real-time GA4 analytics.
          </p>
        </div>
      </div>
    </section>
  )
}
