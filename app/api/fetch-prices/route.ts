import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const companyID = url.searchParams.get('companyID') || '3188';
  const months = parseInt(url.searchParams.get('months') || '24', 10);
  const days = Math.min(months * 30 + 15, 1095); // add buffer for month calculation

  const apiUrl = `https://www.screener.in/api/company/${companyID}/chart/?q=Price&days=${days}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: response.status });
    }

    const data = await response.json();
    const values = data.datasets[0].values as [string, string][];

    // Process to monthly averages
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setMonth(now.getMonth() - months);

    const filtered = values
      .map(([dateStr, priceStr]) => {
        const date = new Date(dateStr);
        const price = parseFloat(priceStr.replace(',', '.')) || 0;
        return { date, price };
      })
      .filter(item => item.date >= cutoff);

    // Group by YYYY-MM and average
    const groups: { [key: string]: number[] } = {};
    filtered.forEach(({ date, price }) => {
      const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (price > 0) {
        if (!groups[key]) groups[key] = [];
        groups[key].push(price);
      }
    });

    // Sort by date
    const monthly = Object.keys(groups)
      .sort()
      .map(key => {
        const sum = groups[key].reduce((s, p) => s + p, 0);
        const avg = sum / groups[key].length;
        return {
          label: key,
          value: Math.round(avg * 100) / 100
        };
      });

    return NextResponse.json({
      prices: monthly.map(m => m.value),
      labels: monthly.map(m => m.label)
    });
  } catch (error) {
    console.error('Server error fetching price data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}