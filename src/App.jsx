import React, { useState } from 'react';

export default function App() {
  const [mode, setMode] = useState('CA'); // 'CA' ou 'RDV'
  const [joursBDR, setJoursBDR] = useState(2);
  const [joursTech, setJoursTech] = useState(3);
  const [joursGrowth, setJoursGrowth] = useState(1);
  const [remunerationFounders, setRemunerationFounders] = useState(false);
  const [tjmBDR, setTjmBDR] = useState(150);
  const [forfaitMensuel, setForfaitMensuel] = useState(10000);
  
  // Mode CA
  const [caGenere, setCaGenere] = useState(50000);
  const [pourcentageVariable, setPourcentageVariable] = useState(10);
  const [coefficient, setCoefficient] = useState(1.0);
  const [partBDR_CA, setPartBDR_CA] = useState(20);
  
  // Mode RDV
  const [cpl, setCpl] = useState(50);
  const [nbRdv, setNbRdv] = useState(100);
  const [partBDR_RDV, setPartBDR_RDV] = useState(20);

  // COÛTS MODIFIABLES ICI (non visibles par l'utilisateur)
  const COUT_BDR = tjmBDR + 15; // TJM BDR + 15€
  const COUT_TECH = 150;
  const COUT_GROWTH = 150;
  const FRAIS_FIXES_PAR_CLIENT = 600;
  const REMUNERATION_FOUNDERS_TOTAL = 8500;
  const REMUNERATION_FOUNDERS_PAR_CLIENT = REMUNERATION_FOUNDERS_TOTAL / 15;

  const coutsProduction = (joursBDR * COUT_BDR) + (joursTech * COUT_TECH) + (joursGrowth * COUT_GROWTH);
  const fraisFixesClient = FRAIS_FIXES_PAR_CLIENT + (remunerationFounders ? REMUNERATION_FOUNDERS_PAR_CLIENT : 0);
  
  // Calcul du variable selon le mode
  const variable = mode === 'CA' 
    ? (caGenere * pourcentageVariable / 100) * coefficient
    : cpl * nbRdv;
  
  // Calcul de la part BDR sur le variable
  const partBDRVariable = mode === 'CA'
    ? variable * (partBDR_CA / 100)
    : variable * (partBDR_RDV / 100);
    
  const coutsTotal = coutsProduction + fraisFixesClient + partBDRVariable;
    
  const revenusTotal = forfaitMensuel + variable;
  
  const margeBrute = revenusTotal - coutsTotal;
  const tauxMarge = revenusTotal > 0 ? (margeBrute / revenusTotal) * 100 : 0;

  // Couleur de la marge selon le taux
  const getMargeColor = () => {
    if (margeBrute < 0) return 'bg-red-500';
    if (tauxMarge < 20) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🧮</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Calculatrice de Rentabilité</h1>
          <p className="text-gray-600">Analysez la rentabilité de vos projets en temps réel</p>
          
          {/* Toggle Switch */}
          <div className="mt-6 inline-flex items-center bg-white rounded-full p-1 shadow-lg border-2 border-gray-200">
            <button
              onClick={() => setMode('CA')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                mode === 'CA' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mode CA
            </button>
            <button
              onClick={() => setMode('RDV')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                mode === 'RDV' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mode RDV
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Production</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  TJM BDR (€/jour)
                </label>
                <input
                  type="number"
                  value={tjmBDR}
                  onChange={(e) => setTjmBDR(Number(e.target.value))}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="10"
                />
                <p className="text-xs text-gray-500 mt-1">Coût final: {COUT_BDR}€/jour (TJM + 15€)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jours BDR
                </label>
                <input
                  type="number"
                  value={joursBDR}
                  onChange={(e) => setJoursBDR(Number(e.target.value))}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="0.5"
                />
                <p className="text-xs text-gray-500 mt-1">{COUT_BDR}€/jour</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jours Tech
                </label>
                <input
                  type="number"
                  value={joursTech}
                  onChange={(e) => setJoursTech(Number(e.target.value))}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="0.5"
                />
                <p className="text-xs text-gray-500 mt-1">{COUT_TECH}€/jour</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jours Growth
                </label>
                <input
                  type="number"
                  value={joursGrowth}
                  onChange={(e) => setJoursGrowth(Number(e.target.value))}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="0.5"
                />
                <p className="text-xs text-gray-500 mt-1">{COUT_GROWTH}€/jour</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mt-4">
                <div className="text-sm text-blue-700 font-medium">Total jours</div>
                <div className="text-2xl font-bold text-blue-900">{joursBDR + joursTech + joursGrowth} jours</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-700">Rémunération founders</div>
                    <div className="text-xs text-gray-500 mt-1">+{REMUNERATION_FOUNDERS_PAR_CLIENT.toFixed(0)}€/client</div>
                  </div>
                  <button
                    onClick={() => setRemunerationFounders(!remunerationFounders)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      remunerationFounders ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        remunerationFounders ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {remunerationFounders && (
                  <div className="text-xs text-gray-600 mt-2">
                    8 500€/mois répartis sur 15 clients
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">💰</span>
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
                  onFocus={(e) => e.target.select()}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                  min="0"
                  step="100"
                />
              </div>

              {mode === 'CA' ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CA généré (€)
                    </label>
                    <input
                      type="number"
                      value={caGenere}
                      onChange={(e) => setCaGenere(Number(e.target.value))}
                      onFocus={(e) => e.target.select()}
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
                      onFocus={(e) => e.target.select()}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                      min="0"
                      max="100"
                      step="0.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Coefficient de complexité
                    </label>
                    <input
                      type="number"
                      value={coefficient}
                      onChange={(e) => setCoefficient(Number(e.target.value))}
                      onFocus={(e) => e.target.select()}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Projet facile &lt;1 | Standard =1 | Complexe &gt;1</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Part BDR sur variable (%)
                    </label>
                    <input
                      type="number"
                      value={partBDR_CA}
                      onChange={(e) => setPartBDR_CA(Number(e.target.value))}
                      onFocus={(e) => e.target.select()}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                      min="0"
                      max="100"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Commission du commercial sur le variable</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CPL - Coût par lead (€)
                    </label>
                    <input
                      type="number"
                      value={cpl}
                      onChange={(e) => setCpl(Number(e.target.value))}
                      onFocus={(e) => e.target.select()}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                      min="0"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Prix payé par RDV généré</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre de RDV par mois
                    </label>
                    <input
                      type="number"
                      value={nbRdv}
                      onChange={(e) => setNbRdv(Number(e.target.value))}
                      onFocus={(e) => e.target.select()}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 mt-4">
                    <div className="text-sm text-green-700 font-medium">Variable total</div>
                    <div className="text-2xl font-bold text-green-900">{variable.toLocaleString('fr-FR')} €</div>
                    <p className="text-xs text-green-600 mt-1">{nbRdv} RDV × {cpl}€</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Part BDR sur variable (%)
                    </label>
                    <input
                      type="number"
                      value={partBDR_RDV}
                      onChange={(e) => setPartBDR_RDV(Number(e.target.value))}
                      onFocus={(e) => e.target.select()}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                      min="0"
                      max="100"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Commission du commercial sur le variable</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
            <div className="mb-6 pb-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">📈 Résultats</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">Revenus totaux</div>
                <div className="text-3xl font-bold mb-2">{revenusTotal.toLocaleString('fr-FR')} €</div>
                <div className="text-xs text-gray-400 space-y-0.5">
                  <div>Forfait: {forfaitMensuel.toLocaleString('fr-FR')} €</div>
                  <div>Variable: {variable.toLocaleString('fr-FR')} €</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">Coûts totaux</div>
                <div className="text-3xl font-bold mb-2">{coutsTotal.toLocaleString('fr-FR')} €</div>
                <div className="text-xs text-gray-400 space-y-0.5">
                  <div>Production: {coutsProduction.toLocaleString('fr-FR')} €</div>
                  <div>Frais fixes: {FRAIS_FIXES_PAR_CLIENT} €</div>
                  {remunerationFounders && (
                    <div>Rémunération founders: {REMUNERATION_FOUNDERS_PAR_CLIENT.toFixed(0)} €</div>
                  )}
                  <div>Part BDR sur variable: {partBDRVariable.toLocaleString('fr-FR')} €</div>
                </div>
              </div>

              <div className={`${getMargeColor()} rounded-xl p-5 shadow-lg`}>
                <div className="text-sm text-white/90 mb-2">Marge brute</div>
                <div className="text-4xl font-bold mb-2">{margeBrute.toLocaleString('fr-FR')} €</div>
                <div className="text-lg font-semibold">Taux: {tauxMarge.toFixed(1)}%</div>
                {tauxMarge < 20 && tauxMarge >= 0 && (
                  <div className="text-sm mt-2 text-white/80">⚠️ Marge faible</div>
                )}
              </div>

              <div className="bg-white/5 border-2 border-white/20 rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">Projection annuelle</div>
                <div className="text-2xl font-bold text-green-400">{(margeBrute * 12).toLocaleString('fr-FR')} €</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Paramètres de base</h3>
              <div className="text-sm text-amber-800 space-y-1">
                <div>• TJM BDR: {tjmBDR}€ (coût final: {COUT_BDR}€) | Tech: {COUT_TECH}€ | Growth: {COUT_GROWTH}€</div>
                <div>• Frais fixes mensuels: 6000€ répartis sur 10 clients = 600€/client</div>
                {remunerationFounders && (
                  <div>• Rémunération founders: 8 500€/mois répartis sur 15 clients = {REMUNERATION_FOUNDERS_PAR_CLIENT.toFixed(0)}€/client</div>
                )}
                <div>• Part BDR sur variable: {mode === 'CA' ? partBDR_CA : partBDR_RDV}% ({partBDRVariable.toLocaleString('fr-FR')}€)</div>
                <div>• Seuil d'alerte: marge &lt; 20%</div>
                <div>• Mode actif: <strong>{mode === 'CA' ? 'Chiffre d\'affaires' : 'Rendez-vous (CPL)'}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
