import React, { useState, useMemo } from 'react';
import { Sliders, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { CalculatorState } from '../types';

interface ImpactCalculatorProps {
  onSelectPod: (podName: string) => void;
}

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({ onSelectPod }) => {
  const [state, setState] = useState<CalculatorState>({
    commuteMode: 'public_transit',
    weeklyCommuteKm: 40,
    dietPreference: 'low_meat',
    compostHabit: 'occasional',
    repairBeforeReplace: 'sometimes'
  });

  // Accurate localized calculation models (kg CO2e / year)
  const results = useMemo(() => {
    // Commute:
    let commuteFactor = 0; // per km per year (50 weeks)
    if (state.commuteMode === 'walk_bike') commuteFactor = 0.005;
    else if (state.commuteMode === 'public_transit') commuteFactor = 0.065;
    else if (state.commuteMode === 'carpool_ev') commuteFactor = 0.085;
    else commuteFactor = 0.192; // gas car

    const annualCommuteKg = Math.round(state.weeklyCommuteKm * 40 * commuteFactor);

    // Diet:
    let dietKg = 1600;
    if (state.dietPreference === 'vegan') dietKg = 750;
    else if (state.dietPreference === 'vegetarian') dietKg = 1100;
    else if (state.dietPreference === 'low_meat') dietKg = 1450;
    else dietKg = 2200;

    // Composting:
    let wasteKg = 380;
    if (state.compostHabit === 'daily') wasteKg = 90;
    else if (state.compostHabit === 'occasional') wasteKg = 220;
    else wasteKg = 410;

    // Goods & repair:
    let goodsKg = 600;
    if (state.repairBeforeReplace === 'always') goodsKg = 240;
    else if (state.repairBeforeReplace === 'sometimes') goodsKg = 460;
    else goodsKg = 750;

    const totalKg = annualCommuteKg + dietKg + wasteKg + goodsKg;
    const campusAverageKg = 4150;
    const difference = totalKg - campusAverageKg;

    // Determine highest leverage club action
    let recommendedPod = 'Campus Circular Repair Cafés';
    let potentialReduction = 480;
    let recommendationReason = 'Repairing gear rather than replacing keeps high embodied carbon goods in circulation.';

    if (state.commuteMode === 'gas_car') {
      recommendedPod = 'Clean Energy & Transit Advocacy';
      potentialReduction = 720;
      recommendationReason = 'Shifting 2 drive days per week to the student bike bus or transit saves over 700 kg CO₂ annually.';
    } else if (state.compostHabit === 'none' || state.compostHabit === 'occasional') {
      recommendedPod = 'Closed-Loop Dining Composting & Food Forest';
      potentialReduction = 320;
      recommendationReason = 'Diverting prep and plate scraps into our thermal campus piles eliminates anaerobic methane production.';
    } else if (state.dietPreference === 'standard' || state.dietPreference === 'low_meat') {
      recommendedPod = 'Native Rewilding & Community Agriculture';
      potentialReduction = 410;
      recommendationReason = 'Growing seasonal food locally and rewilding soil sequesters carbon right on university grounds.';
    }

    return {
      totalKg,
      campusAverageKg,
      difference,
      annualCommuteKg,
      dietKg,
      wasteKg,
      goodsKg,
      recommendedPod,
      potentialReduction,
      recommendationReason
    };
  }, [state]);

  const handleReset = () => {
    setState({
      commuteMode: 'public_transit',
      weeklyCommuteKm: 40,
      dietPreference: 'low_meat',
      compostHabit: 'occasional',
      repairBeforeReplace: 'sometimes'
    });
  };

  return (
    <section id="calculator" className="py-20 md:py-28 bg-[#F4F4EE] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Interactive Analysis Tool
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
            Estimate your student footprint and find your leverage point.
          </h2>
          <p className="text-stone-600 mt-3 text-base">
            Adjust your weekly routine below to simulate your estimated annual carbon footprint. Discover exactly how joining an Eco Club working pod creates collective impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-stone-200/90 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <span className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-800" />
                Routine Parameters
              </span>
              <button
                onClick={handleReset}
                type="button"
                className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset defaults
              </button>
            </div>

            {/* Commute Mode */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Primary Commute Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'walk_bike', label: 'Walk / Bicycle' },
                  { key: 'public_transit', label: 'Transit Bus/Rail' },
                  { key: 'carpool_ev', label: 'Carpool / EV' },
                  { key: 'gas_car', label: 'Solo Gas Car' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      setState((s) => ({ ...s, commuteMode: item.key as CalculatorState['commuteMode'] }))
                    }
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors cursor-pointer ${
                      state.commuteMode === item.key
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Distance Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <label className="font-bold uppercase tracking-wider text-stone-600">
                  Weekly Campus Travel Distance
                </label>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  {state.weeklyCommuteKm} km / week
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={state.weeklyCommuteKm}
                onChange={(e) =>
                  setState((s) => ({ ...s, weeklyCommuteKm: Number(e.target.value) }))
                }
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>

            {/* Diet Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Dietary Pattern
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'vegan', label: '100% Plant-Based' },
                  { key: 'vegetarian', label: 'Vegetarian' },
                  { key: 'low_meat', label: 'Low-Meat / Flex' },
                  { key: 'standard', label: 'Omnivore / Meat' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        dietPreference: item.key as CalculatorState['dietPreference']
                      }))
                    }
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors cursor-pointer ${
                      state.dietPreference === item.key
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Composting */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Food Scraps & Compost Sorting
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'daily', label: 'Daily via Campus Hub' },
                  { key: 'occasional', label: 'Occasional / When Nearby' },
                  { key: 'none', label: 'All to Landfill Trash' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        compostHabit: item.key as CalculatorState['compostHabit']
                      }))
                    }
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors cursor-pointer ${
                      state.compostHabit === item.key
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Repair before replace */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Broken Gear (Clothing, Bike, Tech)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'always', label: 'Always Fix or Mend' },
                  { key: 'sometimes', label: 'Try to Fix If Easy' },
                  { key: 'rarely', label: 'Buy Replacement New' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        repairBeforeReplace: item.key as CalculatorState['repairBeforeReplace']
                      }))
                    }
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors cursor-pointer ${
                      state.repairBeforeReplace === item.key
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Results & Pod Recommendation Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 text-white rounded-2xl p-6 md:p-8 border border-stone-800 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Annual Emissions Model
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-extrabold tabular-nums font-mono">
                  {results.totalKg.toLocaleString()}
                </span>
                <span className="text-stone-300 text-sm">kg CO₂e / year</span>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-800 text-xs text-stone-400 space-y-2">
                <div className="flex justify-between">
                  <span>Commute & Transit:</span>
                  <span className="text-white font-mono tabular-nums">{results.annualCommuteKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Diet & Food System:</span>
                  <span className="text-white font-mono tabular-nums">{results.dietKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Organic Solid Waste:</span>
                  <span className="text-white font-mono tabular-nums">{results.wasteKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Goods & Material Consumption:</span>
                  <span className="text-white font-mono tabular-nums">{results.goodsKg} kg</span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-stone-800/80 border border-stone-700 text-xs leading-relaxed text-stone-300">
                {results.difference < 0 ? (
                  <span>
                    Your current choices are <strong className="text-emerald-400 tabular-nums font-mono">{Math.abs(results.difference)} kg CO₂e below</strong> the average campus baseline ({results.campusAverageKg.toLocaleString()} kg).
                  </span>
                ) : (
                  <span>
                    Your footprint is <strong className="text-amber-400 tabular-nums font-mono">{results.difference} kg CO₂e above</strong> typical campus benchmarks. Hands-on club action can trim this quickly.
                  </span>
                )}
              </div>
            </div>

            {/* Targeted Pod Recommendation Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200/90 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Recommended Action Pod
              </span>
              <h3 className="text-xl font-bold text-stone-900 mt-1 mb-2">
                {results.recommendedPod}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {results.recommendationReason}
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-950 mb-5 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Estimated savings: ~{results.potentialReduction} kg CO₂e / year</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectPod(results.recommendedPod);
                  const el = document.getElementById('membership');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                Join this Action Pod
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
