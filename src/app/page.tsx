import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            UMKM Management
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Aplikasi lengkap untuk manajemen UMKM dengan fitur POS, inventory,
            customer management, dan reporting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Mulai Sekarang
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Lihat Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🛒</span>
                </div>
                Point of Sale
              </CardTitle>
              <CardDescription>
                Sistem kasir yang mudah digunakan dengan dukungan barcode
                scanner dan multiple payment methods
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📦</span>
                </div>
                Inventory Management
              </CardTitle>
              <CardDescription>
                Kelola stok produk dengan real-time tracking, stock alert, dan
                multi-location support
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">👥</span>
                </div>
                Customer Management
              </CardTitle>
              <CardDescription>
                Database pelanggan lengkap dengan loyalty program dan analytics
                behavior
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">💰</span>
                </div>
                Financial Management
              </CardTitle>
              <CardDescription>
                Accounting basic, cash flow management, expense tracking, dan
                tax calculation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📊</span>
                </div>
                Analytics & Reports
              </CardTitle>
              <CardDescription>
                Dashboard interaktif dengan real-time metrics dan comprehensive
                reporting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📱</span>
                </div>
                Offline-First PWA
              </CardTitle>
              <CardDescription>
                Bekerja tanpa internet dengan automatic sync dan cross-platform
                compatibility
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Status Section */}
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="text-center">
            <CardTitle className="text-yellow-800 dark:text-yellow-200">
              🚧 Status Development
            </CardTitle>
            <CardDescription className="text-yellow-700 dark:text-yellow-300">
              <strong>
                Day 1 - Project Initialization & Environment Setup
              </strong>
              <br />
              Tanggal: 9 Juni 2025 | Target Completion: 1 Agustus 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  ✅ Next.js project dengan TypeScript
                </span>
                <span className="text-green-600 text-sm">Complete</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">✅ Dependencies installation</span>
                <span className="text-green-600 text-sm">Complete</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">✅ Shadcn/ui components setup</span>
                <span className="text-green-600 text-sm">Complete</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">✅ PWA configuration</span>
                <span className="text-green-600 text-sm">Complete</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">✅ Testing framework setup</span>
                <span className="text-green-600 text-sm">Complete</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600 dark:text-gray-400">
          <p>
            © 2025 UMKM Management by mohyasrul. Powered by Next.js &
            TypeScript.
          </p>
        </div>
      </div>
    </div>
  );
}
