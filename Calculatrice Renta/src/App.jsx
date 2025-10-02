import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info } from 'lucide-react';

export default function CalculatriceRentabilite() {
  const [joursBDR, setJoursBDR] = useState(2);
  const [joursTech, setJoursTech] = useState(3);
  const [joursGrowth, setJoursGrowth] = useState(1);
  const [forfaitMensuel, setForfaitMensuel] = useState(10000);
  const [caGenere, setCaGenere] = useState(50000);
  const [pourcentageVariable, setPourcentageVariable] = useState(10);
  const [coefficient, setCoefficient] = useState(1.0);

  const COUT_JOUR = 150;
  const FRAIS_FIXES_PAR_CLIENT = 600;

  // Calculs
  const coutsProduction = (joursBDR + joursTech + joursGrowth) * COUT_JOUR;
  const coutsTotal = coutsProduction + FRAIS_FIXES_PAR_CLIENT;
  
  const variable = (caGenere * pourcentageVariable / 100) * coefficient;
  const revenusTotal = forfaitMensuel + variable;
  
  const margeBrute = revenusTotal - coutsTotal;
  const tauxMarge = revenusTotal > 0 ? (margeBrute / revenusTotal) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Calculatrice de Rentabilité</h1>
          <p className="text-gray-600">Analysez la rentabilité de vos projets en temps réel</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne 1: Production */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Production</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jours BDR
                </label>
                <input
                  type="number"
                  value={joursBDR}
                  onChange={(e) => setJoursBDR(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="0.5"
                />
                <p className="text-xs text-gray-500 mt-1">150€/jour</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jours Tech
                </label>
                <input
                  type="number"
                  value={joursTech}
                  onChange={(e) => setJoursTech(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="0.5"
                />
                <p className="text-xs text-gray-500 mt-1">150€/jour</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jours Growth
                </label>
                <input
                  type="number"
                  value={joursGrowth}
                  onChange={(e) => setJoursGrowth(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="0.5"
                />
                <p className="text-xs text-gray-500 mt-1">150€/jour</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mt-4">
                <div className="text-sm text-blue-700 font-medium">Total jours</div>
                <div className="text-2xl font-bold text-blue-900">{joursBDR + joursTech + joursGrowth} jours</div>
              </div>
            </div>
          </div>

          {/* Colonne 2: Revenus */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Revenus</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Forfait mensuel (€)
                </label>
                <input
                  type="number"
                  value={forfaitMensuel}
                  onChange={(e) => setForfaitMensuel(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CA généré (€)
                </label>
                <input
                  type="number"
                  value={caGenere}
                  onChange={(e) => setCaGenere(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  % Variable
                </label>
                <input
                  type="number"
                  value={pourcentageVariable}
                  onChange={(e) => setPourcentageVariable(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  max="100"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Coefficient
                </label>
                <input
                  type="number"
                  value={coefficient}
                  onChange={(e) => setCoefficient(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">Malus &lt;1 | Neutre =1 | Bonus &gt;1</p>
              </div>
            </div>
          </div>

          {/* Colonne 3: Résultats */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
            <div className="mb-6 pb-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Résultats</h2>
            </div>
            
            <div className="space-y-4">
              {/* Revenus */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">Revenus totaux</div>
                <div className="text-3xl font-bold mb-2">{revenusTotal.toLocaleString('fr-FR')} €</div>
                <div className="text-xs text-gray-400 space-y-0.5">
                  <div>Forfait: {forfaitMensuel.toLocaleString('fr-FR')} €</div>
                  <div>Variable: {variable.toLocaleString('fr-FR')} €</div>
                </div>
              </div>

              {/* Coûts */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">Coûts totaux</div>
                <div className="text-3xl font-bold mb-2">{coutsTotal.toLocaleString('fr-FR')} €</div>
                <div className="text-xs text-gray-400 space-y-0.5">
                  <div>Production: {coutsProduction.toLocaleString('fr-FR')} €</div>
                  <div>Frais fixes: 600 €</div>
                </div>
              </div>

              {/* Marge */}
              <div className={`${margeBrute >= 0 ? 'bg-green-500' : 'bg-red-500'} rounded-xl p-5 shadow-lg`}>
                <div className="text-sm text-white/90 mb-2">Marge brute</div>
                <div className="text-4xl font-bold mb-2">{margeBrute.toLocaleString('fr-FR')} €</div>
                <div className="text-lg font-semibold">Taux: {tauxMarge.toFixed(1)}%</div>
              </div>

              {/* Projection annuelle */}
              <div className="bg-white/5 border-2 border-white/20 rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">Projection annuelle</div>
                <div className="text-2xl font-bold text-green-400">{(margeBrute * 12).toLocaleString('fr-FR')} €</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Paramètres de base</h3>
              <div className="text-sm text-amber-800 space-y-1">
                <div>• Coût journalier: 150€ pour tous les métiers</div>
                <div>• Frais fixes mensuels: 6000€ répartis sur 10 clients = 600€/client</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}