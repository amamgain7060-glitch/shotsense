import { useArduinoConnection } from '@/hooks/useArduinoConnection';
import { usePredictionAnalysis } from '@/hooks/usePredictionAnalysis';
import { ConnectionPanel } from '@/components/ConnectionPanel';
import { PredictionDisplay } from '@/components/PredictionDisplay';
import { ConfidenceChart } from '@/components/ConfidenceChart';
import { ShotSenseLogo } from '@/components/ShotSenseLogo';
import { HelpDialog } from '@/components/HelpDialog';

export default function ShotSenseAnalyzer() {
  const {
    connectionStatus,
    predictions,
    error,
    debugInfo,
    connectUSB,
    connectBluetooth,
    disconnect,
    simulateData,
  } = useArduinoConnection();

  const { latestPrediction, lastFivePredictions, averagePredictions, combinedResult, chartData } = usePredictionAnalysis(predictions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <HelpDialog />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6 py-8">
          <div className="flex items-center justify-center gap-6">
            <ShotSenseLogo size={80} className="drop-shadow-lg" />
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent drop-shadow-sm">
                ShotSense
              </h1>
              <p className="text-xl text-blue-200 font-semibold tracking-wide">
                Badminton Shot Analyzer
              </p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-blue-100/80 leading-relaxed">
              Real-time badminton shot analysis using Arduino Nano BLE Sense
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-blue-200/60">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                AI-Powered
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Real-time
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                Arduino BLE
              </span>
            </div>
            
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30">
                <span className="text-lg">👨💻</span>
                <span className="text-purple-200 text-sm font-medium">Developed by Anirudh Mamgain</span>
                <span className="text-lg">✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Panel */}
        <div className="backdrop-blur-sm bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
          <ConnectionPanel
            connectionStatus={connectionStatus}
            error={error}
            debugInfo={debugInfo}
            onConnectUSB={connectUSB}
            onConnectBluetooth={connectBluetooth}
            onDisconnect={disconnect}
            onSimulateData={simulateData}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <PredictionDisplay
              latestPrediction={latestPrediction}
              combinedResult={combinedResult}
              lastFivePredictions={lastFivePredictions}
              averagePredictions={averagePredictions}
            />
          </div>
          
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <ConfidenceChart data={chartData} />
          </div>
        </div>

        {/* Stats Footer */}
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-blue-200 font-medium">
              Total Predictions: <span className="text-cyan-400 font-bold">{predictions.length}</span>
            </span>
            {connectionStatus.isConnected && (
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
            )}
          </div>
        </div>

        {/* Credits Section */}
        <div className="text-center py-8 border-t border-white/10">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">👨‍💻</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Created by Anirudh Mamgain
                </h3>
                <p className="text-blue-200/80 text-sm">
                  Badminton Shot Analysis Expert
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-cyan-400 font-semibold mb-1">🧠 AI Integration</div>
                <div className="text-blue-200/70">Machine learning model integration with Arduino</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-green-400 font-semibold mb-1">⚡ Real-time Analysis</div>
                <div className="text-blue-200/70">Live badminton shot classification system</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-orange-400 font-semibold mb-1">🔧 Hardware Integration</div>
                <div className="text-blue-200/70">Arduino Nano BLE Sense connectivity</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-blue-200/60">
                <span className="text-lg">🏸</span>
                <span className="text-sm">Badminton Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200/60">
                <span className="text-lg">🚀</span>
                <span className="text-sm">Innovation in Sports Tech</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200/60">
                <span className="text-lg">💡</span>
                <span className="text-sm">Creative Problem Solving</span>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-blue-200/50 text-xs">
                Built with React, TypeScript, Arduino, and Machine Learning • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}