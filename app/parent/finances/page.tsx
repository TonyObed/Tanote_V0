"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, TrendingDown, Plus, Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"

const monthlyData = [
  { month: "Jan", depenses: 12000, revenus: 15000 },
  { month: "Fév", depenses: 15000, revenus: 15000 },
  { month: "Mar", depenses: 11000, revenus: 15000 },
]

const transactions = [
  { id: 1, title: "Inscription Kouamé", amount: -5000, date: "15 Mars", type: "depense" },
  { id: 2, title: "Matériel scolaire Aya", amount: -2500, date: "12 Mars", type: "depense" },
  { id: 3, title: "Recharge compte", amount: 15000, date: "1 Mars", type: "revenu" },
]

export default function ParentFinancesPage() {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finances</h1>
          <p className="text-gray-500 text-sm">Gérez vos dépenses et paiements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Recharger
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">Solde actuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">15 000 F</span>
              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">Dépenses ce mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-red-600">7 500 F</span>
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">Économies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-green-600">7 500 F</span>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Dépenses mensuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="depenses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution du solde</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="revenus" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((trans) => (
              <div key={trans.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{trans.title}</p>
                  <p className="text-sm text-gray-500">{trans.date}</p>
                </div>
                <span className={cn("text-lg font-bold", trans.type === "revenu" ? "text-green-600" : "text-red-600")}>
                  {trans.amount > 0 ? "+" : ""}
                  {trans.amount} F
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
