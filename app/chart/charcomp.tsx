'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import type { Chart as ChartJSInstance } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

interface Dataset {
  label: string;
  input: string;
  data: number[];
  color: string;
}

interface ChartDatasetItem {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
  tension: number;
  yAxisID: string;
}

interface ChartData {
  labels: string[];
  datasets: ChartDatasetItem[];
}

const DataCompareChart = () => {

  const chartRef = useRef<ChartJS | null>(null);

  const colors = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF', '#FF69B4', '#FFA500'];

  const [stockList, setStockList] = useState<{symbol: string, companyID: string}[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState('');

  // Fetch CSV on mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/Anny26022/live3.github.io@master/screener_all_listed_company_ids.csv');
        if (!response.ok) throw new Error('Failed to fetch CSV');
        const csvText = await response.text();
        const lines = csvText.split('\n');
        const stocks = lines.slice(1).map(line => {
          const cols = line.split(',');
          if (cols.length >= 2) {
            return { symbol: cols[0].trim(), companyID: cols[1].trim() };
          }
          return null;
        }).filter(Boolean) as {symbol: string, companyID: string}[];
        setStockList(stocks);
      } catch (error) {
        console.error('Error fetching stocks CSV:', error);
      }
    };
    fetchStocks();
  }, []);

  const fetchPriceData = async () => {
    try {
      const response = await fetch(`/api/fetch-prices?companyID=${selectedStock}&months=24`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      const { prices, labels } = data;
      return { prices, labels };
    } catch (error) {
      console.error('Error fetching price data:', error);
      return { prices: [], labels: [] };
    }
  };

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Multi-Dataset Comparison',
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          drag: {
            enabled: true,
          },
          mode: 'xy' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const originalValue = originalData[context.datasetIndex]?.[context.dataIndex];
            return originalValue !== undefined ? `${context.dataset.label}: ${originalValue}` : context.dataset.label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Index',
        },
      },
    },
  };

  const [datasets, setDatasets] = useState<Dataset[]>(() => {
    try {
      const saved = localStorage.getItem('chart-datasets');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 2 && parsed.every((d: any) => d && typeof d.label === 'string' && typeof d.input === 'string')) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error parsing saved datasets:', error);
    }
    return [
      { label: 'DataCompare', input: '', data: [], color: colors[0] },
      { label: 'Nifty', input: '', data: [], color: colors[1] },
    ];
  });

  // Save to localStorage when datasets change
  useEffect(() => {
    localStorage.setItem('chart-datasets', JSON.stringify(datasets));
  }, [datasets]);

  const [error, setError] = useState('');
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<number[][]>([]);

  const options = useMemo(() => {
    if (chartData.labels.length === 0) return baseOptions;

    const allData = chartData.datasets.flatMap(d => d.data);
    const min = Math.min(...allData);
    const max = Math.max(...allData);

    const scales = {
      x: baseOptions.scales.x,
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Percentage (% Growth)',
        },
        min: 0,
        max,
        beginAtZero: true,
      },
    };

    return {
      ...baseOptions,
      scales,
      layout: {
        padding: 0,
      },
    };
  }, [chartData]);

  const addDataset = () => {
    const newIndex = datasets.length;
    const newLabel = `Dataset ${newIndex + 1}`;
    const newColor = colors[newIndex % colors.length];
    setDatasets([...datasets, { label: newLabel, input: '', data: [], color: newColor }]);
  };

  const updateDataset = (index: number, field: keyof Omit<Dataset, 'data' | 'color'>, value: string) => {
    setDatasets(datasets.map((dataset, i) => i === index ? { ...dataset, [field]: value } : dataset));
  };

  const removeDataset = (index: number) => {
    if (datasets.length > 2) {
      setDatasets(datasets.filter((_, i) => i !== index));
    }
  };

  const handleGenerateChart = () => {
    setError('');
    const originalArrays: number[][] = [];
    const parsedDatasets = datasets.map((dataset, index) => {
      const data = dataset.input.split(',').map(num => {
        const parsed = parseFloat(num.trim());
        return isNaN(parsed) ? null : parsed;
      }).filter(val => val !== null);

      originalArrays[index] = [...data];

      let normalizedData = data;
      if (data.length > 0) {
        const first = data[0];
        if (first !== 0) {
          normalizedData = data.map(val => ((val - first) / first) * 100);
        } else {
          normalizedData = data.map(val => val - first);
        }
      }

      return { ...dataset, data: normalizedData };
    });
    setOriginalData(originalArrays);

    if (parsedDatasets.some(d => d.input.trim() === '')) {
      setError('Please enter data for all datasets.');
      return;
    }

    const firstLength = parsedDatasets[0].data.length;
    if (parsedDatasets.some(d => d.data.length !== firstLength)) {
      setError('All arrays must have the same length.');
      return;
    }

    if (firstLength === 0) {
      setError('Please enter valid numeric values.');
      return;
    }

    const labels = chartLabels.length > 0 ? chartLabels.slice(0, firstLength) : Array.from({ length: firstLength }, (_, i) => `${i + 1}`);
    // const labels=[]

    setChartData({
      labels,
      datasets: parsedDatasets.map((dataset, index) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.color,
        backgroundColor: `${dataset.color}33`,
        fill: false,
        tension: 0.1,
        yAxisID: 'y',
      })),
    });
  };

  const selectedSymbol = stockList.find(s => s.companyID === selectedStock)?.symbol || '';
  const filteredStocks = stockList.filter(stock => stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-2xl w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Multi-Dataset Performance Chart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {datasets.map((dataset, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={dataset.label}
                onChange={(e) => updateDataset(index, 'label', e.target.value)}
                className="font-semibold text-gray-700 border-none p-1 rounded focus:ring-2 focus:ring-purple-400"
                placeholder="Label"
              />
              {datasets.length > 2 && (
                <button
                  onClick={() => removeDataset(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <textarea
              value={dataset.input}
              onChange={(e) => updateDataset(index, 'input', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows={4}
              placeholder="e.g., 100, 200, 300"
            />
            <p className="text-xs text-gray-500 mt-1">{dataset.input.split(',').filter(s => s.trim()).length} items</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={addDataset}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow-lg mr-4"
        >
          Add Dataset
        </button>
        <button
          onClick={handleGenerateChart}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg"
        >
          Generate Chart
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-lg ml-2"
        >
          Fetch NSE Price
        </button>
        {chartData.labels.length > 0 && (
          <button
            onClick={() => chartRef.current?.resetZoom()}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 shadow-lg ml-2"
          >
            Reset Zoom
          </button>
        )}
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {chartData.labels.length > 0 && (
        <div className="h-96">
          <Line
            ref={chartRef}
            data={chartData}
            options={options}
          />
        </div>
      )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Select Stock</h2>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Search stock..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="text-sm text-gray-700 mb-2">{selectedStock ? `Selected: ${selectedSymbol}` : 'Select a stock:'}</div>
            <ul className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
              {filteredStocks.map(stock => (
                <li
                  key={stock.companyID}
                  className={`p-3 cursor-pointer hover:bg-gray-100 ${selectedStock === stock.companyID ? 'bg-blue-100' : ''}`}
                  onClick={() => setSelectedStock(stock.companyID)}
                >
                  {stock.symbol}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={async () => {
                  if (selectedStock) {
                    const { prices, labels } = await fetchPriceData();
                    if (prices.length > 0) {
                      const newIndex = datasets.length;
                      const color = colors[newIndex % colors.length];
                      const newDataset = { label: selectedSymbol, input: prices.join(','), data: [], color };
                      setDatasets([...datasets, newDataset]);
                      setChartLabels(labels);
                      setSelectedStock('');
                      setShowModal(false);
                    }
                  }
                }}
              >
                Fetch
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataCompareChart;