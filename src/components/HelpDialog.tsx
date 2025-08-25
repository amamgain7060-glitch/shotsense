import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HelpCircle } from 'lucide-react';

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed top-4 right-4 z-50 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-cyan-400">How to Use ShotSense</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div>
            <h3 className="font-semibold text-blue-300">🔌 Connection</h3>
            <p className="text-blue-100/80">Connect Arduino Nano BLE Sense via USB or use "Simulate Data"</p>
          </div>
          <div>
            <h3 className="font-semibold text-green-300">🏸 Shots</h3>
            <p className="text-blue-100/80">Analyzes: Forehand serve, Backhand serve, Net shot, Idle</p>
          </div>
          <div>
            <h3 className="font-semibold text-purple-300">📊 Data</h3>
            <code className="text-xs bg-black/30 p-1 rounded">{"{"}"Forehand_serve": 0.65{"}"}</code>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}