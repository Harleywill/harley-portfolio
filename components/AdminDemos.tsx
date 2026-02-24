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

// Product Management Demo
const mockProducts = [
  { id: 1, name: '100mm Inline Fan', category: 'Fans', price: 45.99, stock: 124, status: 'Active' },
  { id: 2, name: 'Flexible Ducting 5m', category: 'Ducting', price: 32.50, stock: 87, status: 'Active' },
  { id: 3, name: 'Damper Unit', category: 'Dampers', price: 28.00, stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Wall Vent Adapter', category: 'Vents', price: 15.99, stock: 342, status: 'Active' },
  { id: 5, name: 'Installation Kit', category: 'Accessories', price: 12.00, stock: 56, status: 'Low Stock' },
]

// Orders Demo
const mockOrders = [
  { id: '#ORD-001', customer: 'John Smith', amount: 245.99, status: 'Delivered', date: '2026-02-20' },
  { id: '#ORD-002', customer: 'Sarah Johnson', amount: 156.50, status: 'Processing', date: '2026-02-22' },
  { id: '#ORD-003', customer: 'Mike Brown', amount: 89.99, status: 'Shipped', date: '2026-02-23' },
  { id: '#ORD-004', customer: 'Emma Wilson', amount: 312.75, status: 'Pending', date: '2026-02-24' },
]

// Discount Codes Demo
const mockDiscounts = [
  { code: 'SAVE10', discount: '10%', uses: 234, maxUses: 500, active: true },
  { code: 'FREESHIP', discount: 'Free Shipping', uses: 156, maxUses: 1000, active: true },
  { code: 'SUMMER20', discount: '20%', uses: 89, maxUses: 200, active: false },
  { code: 'VIP15', discount: '15%', uses: 45, maxUses: 100, active: true },
]

type DemoTab = 'analytics' | 'products' | 'orders' | 'discounts'

export default function AdminDemos() {
  const [activeTab, setActiveTab] = useState<DemoTab>('analytics')
  const [editingProduct, setEditingProduct] = useState<number | null>(null)

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
                <button className="px-4 py-2 bg-accent-lime text-dark rounded-lg font-semibold hover:bg-accent-lime/90">
                  + Add Product
                </button>
              </div>

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
                    {mockProducts.map((product) => (
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
                            onClick={() => setEditingProduct(editingProduct === product.id ? null : product.id)}
                            className="text-accent-lime hover:text-accent-lime/80 font-semibold text-sm"
                          >
                            {editingProduct === product.id ? 'Save' : 'Edit'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {editingProduct && (
                <div className="bg-dark/50 p-6 rounded-lg border border-gray-700/30 mt-6">
                  <h4 className="text-lg font-bold mb-4 text-white">Edit Product</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Product Name" className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white" />
                    <input type="number" placeholder="Price" className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white" />
                    <input type="number" placeholder="Stock" className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white" />
                    <select className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Orders Demo */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Order Management</h3>
                <select className="bg-dark border border-gray-700/50 rounded px-3 py-2 text-white">
                  <option>All Orders</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>

              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-dark/50 p-4 rounded-lg border border-gray-700/30 hover:border-accent-lime/50 transition cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-bold text-lg">{order.id}</p>
                        <p className="text-gray-400 text-sm">{order.customer}</p>
                        <p className="text-gray-500 text-xs mt-1">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-accent-lime font-bold text-xl">£{order.amount.toFixed(2)}</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                            order.status === 'Delivered'
                              ? 'bg-green-500/20 text-green-400'
                              : order.status === 'Processing'
                                ? 'bg-blue-500/20 text-blue-400'
                                : order.status === 'Shipped'
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <button className="text-accent-lime text-sm font-semibold mt-3 hover:text-accent-lime/80">
                      View Details →
                    </button>
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
                <button className="px-4 py-2 bg-accent-lime text-dark rounded-lg font-semibold hover:bg-accent-lime/90">
                  + Create Code
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockDiscounts.map((discount) => (
                  <div
                    key={discount.code}
                    className="bg-dark/50 p-6 rounded-lg border border-gray-700/30 hover:border-accent-lime/50 transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-white font-bold text-xl">{discount.code}</p>
                        <p className="text-accent-orange font-semibold text-lg mt-1">{discount.discount}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          discount.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {discount.active ? 'Active' : 'Inactive'}
                      </span>
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
                      <button className="flex-1 px-3 py-2 bg-dark border border-gray-700/50 rounded hover:border-gray-600 text-gray-400 text-sm font-semibold">
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 bg-dark border border-gray-700/50 rounded hover:border-gray-600 text-gray-400 text-sm font-semibold">
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
