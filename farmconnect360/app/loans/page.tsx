"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Calculator, Info, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Loan types and interest rates
const loanTypes = {
  kcc: {
    name: "Kisan Credit Card",
    interestRate: 7.0,
    maxTenure: 12,
    description: "Short-term credit for crop production, post-harvest expenses, and farm maintenance.",
    eligibility: "All farmers, including tenant farmers and sharecroppers.",
    documents: ["Land ownership/tenancy documents", "Identity proof", "Address proof", "Passport-sized photographs"],
  },
  term: {
    name: "Agricultural Term Loan",
    interestRate: 8.5,
    maxTenure: 84,
    description: "Medium to long-term loans for farm machinery, equipment, land development, etc.",
    eligibility: "Farmers with good credit history and repayment capacity.",
    documents: [
      "Land ownership documents",
      "Farm income proof",
      "Identity proof",
      "Address proof",
      "Quotation for machinery/equipment",
    ],
  },
  micro: {
    name: "Micro Irrigation Loan",
    interestRate: 6.0,
    maxTenure: 60,
    description: "Specialized loans for installing drip and sprinkler irrigation systems.",
    eligibility: "Farmers looking to implement water-efficient irrigation systems.",
    documents: [
      "Land ownership documents",
      "Farm income proof",
      "Identity proof",
      "Address proof",
      "Irrigation system quotation",
    ],
  },
  warehouse: {
    name: "Warehouse Receipt Loan",
    interestRate: 6.5,
    maxTenure: 12,
    description: "Loans against stored agricultural produce in registered warehouses.",
    eligibility: "Farmers with produce stored in recognized warehouses.",
    documents: ["Warehouse receipt", "Identity proof", "Address proof"],
  },
}

// Form schema
const formSchema = z.object({
  loanType: z.string({
    required_error: "Please select a loan type.",
  }),
  loanAmount: z.coerce.number().positive({
    message: "Loan amount must be a positive number.",
  }),
  interestRate: z.coerce.number().positive({
    message: "Interest rate must be a positive number.",
  }),
  loanTenure: z.coerce.number().positive({
    message: "Loan tenure must be a positive number.",
  }),
  paymentFrequency: z.enum(["monthly", "quarterly", "half-yearly", "yearly"]),
})

export default function LoanCalculator() {
  const { t } = useLanguage()
  const [calculationResult, setCalculationResult] = useState<any | null>(null)
  const [selectedLoanType, setSelectedLoanType] = useState<string | null>(null)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 100000,
      interestRate: 7.0,
      loanTenure: 12,
      paymentFrequency: "monthly",
    },
  })

  // Watch for loan type changes
  const watchLoanType = form.watch("loanType")
  if (watchLoanType && watchLoanType !== selectedLoanType) {
    setSelectedLoanType(watchLoanType)
    const loanTypeInfo = loanTypes[watchLoanType as keyof typeof loanTypes]
    if (loanTypeInfo) {
      form.setValue("interestRate", loanTypeInfo.interestRate)
    }
  }

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Calculate EMI
    const principal = values.loanAmount
    const ratePerPeriod = values.interestRate / 100 / 12
    let numberOfPayments = values.loanTenure

    // Adjust number of payments based on frequency
    switch (values.paymentFrequency) {
      case "monthly":
        numberOfPayments = values.loanTenure
        break
      case "quarterly":
        numberOfPayments = Math.ceil(values.loanTenure / 3)
        break
      case "half-yearly":
        numberOfPayments = Math.ceil(values.loanTenure / 6)
        break
      case "yearly":
        numberOfPayments = Math.ceil(values.loanTenure / 12)
        break
    }

    // Calculate EMI using the formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const emi =
      (principal * ratePerPeriod * Math.pow(1 + ratePerPeriod, numberOfPayments)) /
      (Math.pow(1 + ratePerPeriod, numberOfPayments) - 1)

    // Generate amortization schedule
    const amortizationSchedule = []
    let remainingPrincipal = principal
    let totalInterest = 0
    let totalPayment = 0

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingPrincipal * ratePerPeriod
      const principalPayment = emi - interestPayment
      remainingPrincipal -= principalPayment

      totalInterest += interestPayment
      totalPayment += emi

      amortizationSchedule.push({
        paymentNumber: i,
        paymentAmount: emi,
        principalPayment,
        interestPayment,
        remainingPrincipal: Math.max(0, remainingPrincipal),
      })
    }

    // Generate chart data
    const chartData = amortizationSchedule.map((payment) => ({
      paymentNumber: payment.paymentNumber,
      principal: payment.principalPayment,
      interest: payment.interestPayment,
    }))

    // Pie chart data
    const pieChartData = [
      { name: "Principal", value: principal },
      { name: "Interest", value: totalInterest },
    ]

    setCalculationResult({
      emi,
      totalPayment,
      totalInterest,
      amortizationSchedule,
      chartData,
      pieChartData,
      loanDetails: {
        principal,
        interestRate: values.interestRate,
        tenure: values.loanTenure,
        paymentFrequency: values.paymentFrequency,
      },
    })
  }

  // Colors for pie chart
  const COLORS = ["#4CAF50", "#3B82F6"]

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold tracking-tight">Loan Calculator</h1>
        </div>
        <p className="text-muted-foreground">
          Calculate loan EMIs and plan your finances for fertilizers, seeds, and farm equipment
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Agricultural Loan Calculator</CardTitle>
              <CardDescription>
                Calculate EMIs and total payments for different types of agricultural loans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="loanType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select loan type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(loanTypes).map(([key, loan]) => (
                              <SelectItem key={key} value={key}>
                                {loan.name} ({loan.interestRate}%)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {selectedLoanType && loanTypes[selectedLoanType as keyof typeof loanTypes]?.description}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Amount (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1000" step="1000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between">
                          <FormLabel>Interest Rate (%)</FormLabel>
                          <span>{field.value}%</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={4}
                            max={15}
                            step={0.1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanTenure"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between">
                          <FormLabel>Loan Tenure (months)</FormLabel>
                          <span>{field.value} months</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={1}
                            max={
                              selectedLoanType
                                ? loanTypes[selectedLoanType as keyof typeof loanTypes]?.maxTenure || 84
                                : 84
                            }
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="half-yearly">Half-Yearly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Calculate Loan
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {selectedLoanType && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{loanTypes[selectedLoanType as keyof typeof loanTypes].name}</CardTitle>
                <CardDescription>Loan details and eligibility criteria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Eligibility</h3>
                  <p className="text-sm text-muted-foreground">
                    {loanTypes[selectedLoanType as keyof typeof loanTypes].eligibility}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Required Documents</h3>
                  <ul className="space-y-1">
                    {loanTypes[selectedLoanType as keyof typeof loanTypes].documents.map((doc, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="mr-2">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Interest Rate</AlertTitle>
                  <AlertDescription>
                    Current interest rate is {loanTypes[selectedLoanType as keyof typeof loanTypes].interestRate}% for{" "}
                    {loanTypes[selectedLoanType as keyof typeof loanTypes].name}. Rates may vary based on your credit
                    history and relationship with the bank.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {calculationResult ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Calculation Results</CardTitle>
                  <CardDescription>
                    Based on your loan amount of ₹{calculationResult.loanDetails.principal.toLocaleString()} at{" "}
                    {calculationResult.loanDetails.interestRate}% for {calculationResult.loanDetails.tenure} months
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        {calculationResult.loanDetails.paymentFrequency.charAt(0).toUpperCase() +
                          calculationResult.loanDetails.paymentFrequency.slice(1)}{" "}
                        Payment
                      </h3>
                      <div className="text-2xl font-bold">₹{Math.round(calculationResult.emi).toLocaleString()}</div>
                    </div>
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Interest</h3>
                      <div className="text-2xl font-bold">
                        ₹{Math.round(calculationResult.totalInterest).toLocaleString()}
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Payment</h3>
                      <div className="text-2xl font-bold">
                        ₹{Math.round(calculationResult.totalPayment).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Breakdown</h3>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          principal: {
                            label: "Principal",
                            color: "hsl(var(--chart-1))",
                          },
                          interest: {
                            label: "Interest",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={calculationResult.chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="paymentNumber" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="principal"
                              stroke="var(--color-principal)"
                              name="Principal"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="interest"
                              stroke="var(--color-interest)"
                              name="Interest"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  <Tabs defaultValue="amortization" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="amortization">Amortization Schedule</TabsTrigger>
                      <TabsTrigger value="summary">Loan Summary</TabsTrigger>
                    </TabsList>
                    <TabsContent value="amortization" className="space-y-4 pt-4">
                      <div className="rounded-md border max-h-[400px] overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Payment No.</TableHead>
                              <TableHead>Payment Amount</TableHead>
                              <TableHead>Principal</TableHead>
                              <TableHead>Interest</TableHead>
                              <TableHead>Balance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {calculationResult.amortizationSchedule.map((payment: any) => (
                              <TableRow key={payment.paymentNumber}>
                                <TableCell>{payment.paymentNumber}</TableCell>
                                <TableCell>₹{Math.round(payment.paymentAmount).toLocaleString()}</TableCell>
                                <TableCell>₹{Math.round(payment.principalPayment).toLocaleString()}</TableCell>
                                <TableCell>₹{Math.round(payment.interestPayment).toLocaleString()}</TableCell>
                                <TableCell>₹{Math.round(payment.remainingPrincipal).toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="summary" className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border p-4">
                            <h4 className="text-sm font-medium mb-2">Loan Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Loan Amount:</span>
                                <span>₹{calculationResult.loanDetails.principal.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Interest Rate:</span>
                                <span>{calculationResult.loanDetails.interestRate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Loan Tenure:</span>
                                <span>{calculationResult.loanDetails.tenure} months</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Payment Frequency:</span>
                                <span>
                                  {calculationResult.loanDetails.paymentFrequency.charAt(0).toUpperCase() +
                                    calculationResult.loanDetails.paymentFrequency.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="rounded-lg border p-4">
                            <h4 className="text-sm font-medium mb-2">Payment Summary</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Number of Payments:</span>
                                <span>{calculationResult.amortizationSchedule.length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Payment Amount:</span>
                                <span>₹{Math.round(calculationResult.emi).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Interest:</span>
                                <span>₹{Math.round(calculationResult.totalInterest).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Payment:</span>
                                <span>₹{Math.round(calculationResult.totalPayment).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h4 className="text-sm font-medium mb-2">Interest to Principal Ratio</h4>
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="w-full md:w-1/2 h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={calculationResult.pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  >
                                    {calculationResult.pieChartData.map((entry: any, index: number) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="w-full md:w-1/2">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                  <span className="text-sm">
                                    Principal: ₹{calculationResult.loanDetails.principal.toLocaleString()} (
                                    {Math.round(
                                      (calculationResult.loanDetails.principal /
                                        (calculationResult.loanDetails.principal + calculationResult.totalInterest)) *
                                        100,
                                    )}
                                    %)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                  <span className="text-sm">
                                    Interest: ₹{Math.round(calculationResult.totalInterest).toLocaleString()} (
                                    {Math.round(
                                      (calculationResult.totalInterest /
                                        (calculationResult.loanDetails.principal + calculationResult.totalInterest)) *
                                        100,
                                    )}
                                    %)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-4">
                    <Button className="flex-1" variant="outline" onClick={() => setCalculationResult(null)}>
                      Reset Calculator
                    </Button>
                    <Button className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Agricultural Loan Information</CardTitle>
                <CardDescription>
                  Learn about different types of agricultural loans available for farmers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Kisan Credit Card (KCC)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Short-term credit for crop production, post-harvest expenses, and farm maintenance. Interest rates
                    start from 7%.
                  </p>
                  <div className="text-sm">
                    <span className="font-medium">Eligibility:</span> All farmers, including tenant farmers and
                    sharecroppers.
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Agricultural Term Loan</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Medium to long-term loans for farm machinery, equipment, land development, etc. Interest rates start
                    from 8.5%.
                  </p>
                  <div className="text-sm">
                    <span className="font-medium">Eligibility:</span> Farmers with good credit history and repayment
                    capacity.
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Micro Irrigation Loan</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Specialized loans for installing drip and sprinkler irrigation systems. Interest rates start from
                    6%.
                  </p>
                  <div className="text-sm">
                    <span className="font-medium">Eligibility:</span> Farmers looking to implement water-efficient
                    irrigation systems.
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>How to Use the Calculator</AlertTitle>
                  <AlertDescription>
                    Select a loan type, enter the loan amount, adjust the interest rate and tenure if needed, and choose
                    your preferred payment frequency. Click "Calculate Loan" to see your EMI and payment schedule.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
