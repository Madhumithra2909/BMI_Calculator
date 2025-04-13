import React, { useState, useEffect } from 'react';
import { Scale, ArrowRight } from 'lucide-react';

interface HealthTip {
  underweight: string[];
  overweight: string[];
}

function App() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const healthTips: HealthTip = {
    underweight: [
      'Eat more frequently throughout the day',
      'Include protein-rich foods in every meal',
      'Add healthy fats like nuts, avocados, and olive oil',
      'Drink calories through smoothies and protein shakes',
      'Get adequate sleep (7-9 hours)',
      'Perform strength training exercises'
    ],
    overweight: [
      'Practice portion control',
      'Increase intake of fruits and vegetables',
      'Choose whole grains over refined grains',
      'Stay hydrated with water',
      'Exercise regularly (30 minutes daily)',
      'Get adequate sleep to regulate hormones'
    ]
  };

  const calculateBMI = () => {
    if (weight && height) {
      const weightInKg = parseFloat(weight);
      const heightInM = parseFloat(height) / 100;
      const calculatedBMI = weightInKg / (heightInM * heightInM);
      setBmi(parseFloat(calculatedBMI.toFixed(1)));
    }
  };

  useEffect(() => {
    if (bmi !== null) {
      if (bmi < 18.5) {
        setCategory('underweight');
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setCategory('normal');
      } else {
        setCategory('overweight');
      }
    }
  }, [bmi]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Scale className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">BMI Calculator</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter height"
              />
            </div>
          </div>

          <button
            onClick={calculateBMI}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Calculate BMI
            <ArrowRight className="w-5 h-5" />
          </button>

          {bmi !== null && (
            <div className="mt-8">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Your Results</h2>
                <p className="text-4xl font-bold text-blue-600 mb-2">{bmi}</p>
                <p className="text-lg capitalize">
                  Category:{' '}
                  <span className={`font-semibold ${
                    category === 'normal' 
                      ? 'text-green-600' 
                      : category === 'underweight' 
                        ? 'text-orange-600' 
                        : 'text-red-600'
                  }`}>
                    {category}
                  </span>
                </p>
              </div>

              {category !== 'normal' && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Recommendations to Achieve Normal BMI
                  </h3>
                  <ul className="space-y-3">
                    {category === 'underweight' &&
                      healthTips.underweight.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="min-w-4 h-4 mt-1">•</div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    {category === 'overweight' &&
                      healthTips.overweight.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="min-w-4 h-4 mt-1">•</div>
                          <span>{tip}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;